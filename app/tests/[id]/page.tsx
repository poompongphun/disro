"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

const ICE_SERVERS = {
  iceServers: [
    {
      urls: "stun:openrelay.metered.ca:80",
    },
  ],
};

const Room = () => {
  // useSocket();
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);

  const router = useRouter();
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const peerVideoRef = useRef<HTMLVideoElement>(null);
  const rtcConnectionRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<Socket>();
  const userStreamRef = useRef<MediaStream>();
  const hostRef = useRef(false);

  const { id: roomName } = useParams() as { id: string };
  useEffect(() => {
    socketRef.current = io("/", {
      path: "/api/socket",
    });
    // First we join a room
    socketRef.current.emit("join", roomName);

    socketRef.current.on("joined", handleRoomJoined);
    // If the room didn't exist, the server would emit the room was 'created'
    socketRef.current.on("created", handleRoomCreated);
    // Whenever the next person joins, the server emits 'ready'
    socketRef.current.on("ready", initiateCall);

    // Emitted when a peer leaves the room
    socketRef.current.on("leave", onPeerLeave);

    // If the room is full, we show an alert
    socketRef.current.on("full", () => {
      window.location.href = "/";
    });

    // Event called when a remote user initiating the connection and
    socketRef.current.on("offer", handleReceivedOffer);
    socketRef.current.on("answer", handleAnswer);
    socketRef.current.on("ice-candidate", handlerNewIceCandidateMsg);

    // clear up after
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [roomName]);

  const handleRoomJoined = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: { width: 500, height: 500 },
      })
      .then((stream) => {
        /* use the stream */
        if (userVideoRef.current && socketRef.current) {
          userStreamRef.current = stream;
          userVideoRef.current.srcObject = stream;
          userVideoRef.current.onloadedmetadata = () => {
            if (userVideoRef.current) userVideoRef.current.play();
          };
          socketRef.current.emit("ready", roomName);
        }
      })
      .catch((err) => {
        /* handle the error */
        console.log("error", err);
      });
  };

  const handleRoomCreated = () => {
    hostRef.current = true;
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: { width: 500, height: 500 },
      })
      .then((stream) => {
        /* use the stream */
        userStreamRef.current = stream;
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
          userVideoRef.current.onloadedmetadata = () => {
            if (userVideoRef.current) userVideoRef.current.play();
          };
        }
      })
      .catch((err) => {
        /* handle the error */
        console.log(err);
      });
  };

  const initiateCall = () => {
    if (hostRef.current && userStreamRef.current) {
      rtcConnectionRef.current = createPeerConnection();
      rtcConnectionRef.current.addTrack(
        userStreamRef.current.getTracks()[0],
        userStreamRef.current
      );
      rtcConnectionRef.current.addTrack(
        userStreamRef.current.getTracks()[1],
        userStreamRef.current
      );
      rtcConnectionRef.current
        .createOffer()
        .then((offer) => {
          if (rtcConnectionRef.current && socketRef.current) {
            rtcConnectionRef.current.setLocalDescription(offer);
            socketRef.current.emit("offer", offer, roomName);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onPeerLeave = () => {
    // This person is now the creator because they are the only person in the room.
    hostRef.current = true;
    if (
      peerVideoRef.current &&
      peerVideoRef.current.srcObject instanceof MediaStream
    ) {
      peerVideoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop()); // Stops receiving all track of Peer.
    }

    // Safely closes the existing connection established with the peer who left.
    if (rtcConnectionRef.current) {
      rtcConnectionRef.current.ontrack = null;
      rtcConnectionRef.current.onicecandidate = null;
      rtcConnectionRef.current.close();
      rtcConnectionRef.current = null;
    }
  };

  /**
   * Takes a userid which is also the socketid and returns a WebRTC Peer
   *
   * @param  {string} userId Represents who will receive the offer
   * @returns {RTCPeerConnection} peer
   */

  const createPeerConnection = () => {
    // We create a RTC Peer Connection
    const connection = new RTCPeerConnection(ICE_SERVERS);

    // We implement our onicecandidate method for when we received a ICE candidate from the STUN server
    connection.onicecandidate = handleICECandidateEvent;

    // We implement our onTrack method for when we receive tracks
    connection.ontrack = handleTrackEvent;
    return connection;
  };

  const handleReceivedOffer = (offer: RTCSessionDescriptionInit) => {
    if (!hostRef.current && userStreamRef.current) {
      rtcConnectionRef.current = createPeerConnection();
      rtcConnectionRef.current.addTrack(
        userStreamRef.current.getTracks()[0],
        userStreamRef.current
      );
      rtcConnectionRef.current.addTrack(
        userStreamRef.current.getTracks()[1],
        userStreamRef.current
      );
      rtcConnectionRef.current.setRemoteDescription(offer);

      rtcConnectionRef.current
        .createAnswer()
        .then((answer) => {
          if (rtcConnectionRef.current && socketRef.current) {
            rtcConnectionRef.current.setLocalDescription(answer);
            socketRef.current.emit("answer", answer, roomName);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleAnswer = (answer: RTCSessionDescriptionInit) => {
    if (rtcConnectionRef.current)
      rtcConnectionRef.current
        .setRemoteDescription(answer)
        .catch((err) => console.log(err));
  };

  const handleICECandidateEvent = (event: { candidate: any }) => {
    if (event.candidate && socketRef.current) {
      socketRef.current.emit("ice-candidate", event.candidate, roomName);
    }
  };

  const handlerNewIceCandidateMsg = (
    incoming: RTCIceCandidateInit | undefined
  ) => {
    // We cast the incoming candidate to RTCIceCandidate
    const candidate = new RTCIceCandidate(incoming);
    if (rtcConnectionRef.current)
      rtcConnectionRef.current
        .addIceCandidate(candidate)
        .catch((e) => console.log(e));
  };

  const handleTrackEvent = (event: RTCTrackEvent) => {
    // eslint-disable-next-line prefer-destructuring
    if (peerVideoRef.current) peerVideoRef.current.srcObject = event.streams[0];
  };

  const toggleMediaStream = (type: string, state: boolean) => {
    if (userStreamRef.current)
      userStreamRef.current.getTracks().forEach((track) => {
        if (track.kind === type) {
          // eslint-disable-next-line no-param-reassign
          track.enabled = !state;
        }
      });
  };

  const toggleMic = () => {
    toggleMediaStream("audio", micActive);
    setMicActive((prev) => !prev);
  };

  const toggleCamera = () => {
    toggleMediaStream("video", cameraActive);
    setCameraActive((prev) => !prev);
  };

  const leaveRoom = () => {
    if (socketRef.current) socketRef.current.emit("leave", roomName); // Let's the server know that user has left the room.

    if (
      userVideoRef.current &&
      userVideoRef.current.srcObject instanceof MediaStream
    ) {
      userVideoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop()); // Stops receiving all track of User.
    }
    if (
      peerVideoRef.current &&
      peerVideoRef.current.srcObject instanceof MediaStream
    ) {
      peerVideoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop()); // Stops receiving audio track of Peer.
    }

    // Checks if there is peer on the other side and safely closes the existing connection established with the peer.
    if (rtcConnectionRef.current) {
      rtcConnectionRef.current.ontrack = null;
      rtcConnectionRef.current.onicecandidate = null;
      rtcConnectionRef.current.close();
      rtcConnectionRef.current = null;
    }
    router.push("/");
  };

  return (
    <div>
      <video autoPlay ref={userVideoRef} />
      <video autoPlay ref={peerVideoRef} />
      <button onClick={toggleMic} type="button">
        {micActive ? "Mute Mic" : "UnMute Mic"}
      </button>
      <button onClick={leaveRoom} type="button">
        Leave
      </button>
      <button onClick={toggleCamera} type="button">
        {cameraActive ? "Stop Camera" : "Start Camera"}
      </button>
    </div>
  );
};

export default Room;
