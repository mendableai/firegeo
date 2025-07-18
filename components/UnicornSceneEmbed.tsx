"use client";
import UnicornScene from "unicornstudio-react";

export default function UnicornSceneEmbed() {
  return (
    <UnicornScene 
      projectId="EbDIGVtu1k0qbzUfOxYU" 
      width={800} 
      height={600}
      placeholder={<div style={{background: "#eee", width: "100%", height: "100%"}}>Loading...</div>}
    />
  );
} 