"use client";
import UnicornScene from "unicornstudio-react/next";

export default function UnicornHero() {
  return (
    <div className="flex justify-center mb-6">
      <UnicornScene
        projectId="EbDIGVtu1k0qbzUfOxYU"
        width={800}
        height={600}
        lazyLoad={false}
        placeholder={
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span>Loading 3D Scene...</span>
          </div>
        }
      />
    </div>
  );
} 