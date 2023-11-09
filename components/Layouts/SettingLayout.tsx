import React from "react";

const buttonPath = [{
    name: "Details",
    path: "/setting",
},
{
    name: "Roles",
    path: "/setting/roles",
},
{
    name: "Members",
    path: "/setting/members",
}]


const SettingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-row text-center h-screen w-screen">
            <div className="flex flex-col bg-[#132043] w-1/5 py-10 justify-between">
                <div className="flex-1 py-5 my-6 w-full">
                    <div className="flex flex-col gap-y-4 text-lg">
                        {buttonPath.map((item) => (
                            <button type="button" key={item.path} className="hover:bg-[#1F4172] py-4"
                            onClick={()=>{
                                alert(item.name)
                            }}>{item.name}</button>
                        ))}
                    </div>
                </div>
                <button className="py-5 my-6 w-full hover:bg-[#1F4172] text-red-600"
                onClick={()=>{
                    alert("Delete Project")
                }}>Delete Project</button>
            </div>
            {children}
        </div>
    );
};

export default SettingLayout;