import React from "react";
import "../styles/Story.css";
import { Avatar } from "@mui/material";

function Story() {
  return (
    <div className="story">
      <div
        className="storyCard"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1483232539664-d89822fb5d3e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG8lMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww)`,
        }}
      >
        <Avatar src="https://images.unsplash.com/photo-1715590876582-18e4844864a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8" />
        <h4>Vaibhav</h4>
      </div>
      <div
        className="storyCard"
        style={{
          backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuU6hKCn6_X-zJ58Twub5ySa_wMiBg1zRi9uofaMrd-0L0zeXFPLM7jBZUfRV_BpR-k2c&usqp=CAU)`,
        }}
      >
        <Avatar src="https://images.unsplash.com/photo-1715622053361-4baf5ad2c51a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8" />
        <h4>User2</h4>
      </div>
      <div
        className="storyCard"
        style={{
          backgroundImage: `url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3BmLWx1a2VzdGFja3Bvb2xlMi1qdW5nbGUtcGF0aC1uei1qai1qb2I1NzEtMi5qcGc.jpg)`,
        }}
      >
        <Avatar src="https://plus.unsplash.com/premium_photo-1661964217492-70800dc09cac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D" />
        <h4>User3</h4>
      </div>
      <div
        className="storyCard"
        style={{
          backgroundImage: `url('https://i.pinimg.com/736x/58/bd/4f/58bd4fc9ebfccc1f2de419529bbf1a12.jpg')`,
        }}
      >
        <Avatar src="https://images.unsplash.com/photo-1715423058726-ddea1ec51b66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D" />
        <h4>Aadi</h4>
      </div>
      <div
        className="storyCard"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-vector/realistic-neon-lights-background_23-2148907367.jpg')`,
        }}
      >
        <Avatar src="https://images.unsplash.com/photo-1715596828741-3e2aa6bc3aff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" />
        <h4>Purush</h4>
      </div>
    </div>
  );
}

export default Story;
