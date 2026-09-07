"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Room = {
  name: string;
  desc: string;
  image: string;
  q: string;
  span: string;
};

const BASE_ROOMS: Room[] = [
  {
    name: "For your dance",
    desc: "Live search tailored to your form.",
    image: "/explore/categories/poses.jpg",
    q: "Bharatanatyam classical dance photography",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    name: "Costume",
    desc: "Silhouette, silk, and stage color.",
    image: "/explore/categories/costumes.jpg",
    q: "Bharatanatyam silk costume performance",
    span: "",
  },
  {
    name: "Jewellery",
    desc: "Ornaments that read from the stage.",
    image: "/explore/categories/jewelry.jpg",
    q: "South Indian temple jewellery gold necklace jhumka",
    span: "",
  },
  {
    name: "Abhinaya",
    desc: "Mood and expression studies.",
    image: "/explore/categories/expressions.jpg",
    q: "Bharatanatyam abhinaya facial expression",
    span: "lg:col-span-2",
  },
  {
    name: "Mudras / Hastas",
    desc: "Hand clarity for practice and photos.",
    image: "/explore/categories/hastas.jpg",
    q: "Bharatanatyam mudra hand gesture close up",
    span: "",
  },
  {
    name: "Temples",
    desc: "Architecture as stage and frame.",
    image: "/explore/categories/temples.jpg",
    q: "South Indian temple gopuram Dravidian architecture",
    span: "",
  },
  {
    name: "Salangai / Ghungroo",
    desc: "Rhythm you can see.",
    image: "/explore/categories/salangai.jpg",
    q: "salangai ghungroo ankle bells Bharatanatyam",
    span: "",
  },
  {
    name: "Stage design",
    desc: "Light, entrance, and space.",
    image: "/explore/categories/photography.jpg",
    q: "classical dance stage design lighting",
    span: "",
  },
  {
    name: "Photography",
    desc: "Portfolio and performance frames.",
    image: "/explore/categories/photography.jpg",
    q: "Bharatanatyam dance photography stage",
    span: "lg:col-span-2",
  },
  {
    name: "Practice",
    desc: "Rehearsal energy and studio focus.",
    image: "/explore/categories/history.jpg",
    q: "Bharatanatyam practice rehearsal studio",
    span: "",
  },
];

export default function ExploreAppPage() {
  const [danceForm, setDanceForm] = useState("your dance");
  const [rooms, setRooms] = useState(BASE_ROOMS);

  useEffect(() => {
    void fetch("/api/discover/context")
      .then((r) => r.json())
      .then((data) => {
        const form = data.profile?.danceForm || "Indian classical dance";
        setDanceForm(form);
        setRooms(
          BASE_ROOMS.map((room) => {
            if (room.name === "For your dance") {
              return {
                ...room,
                desc: `Prioritized for ${form}.`,
                q: `${form} classical dance photography`,
              };
            }
            if (room.name === "Costume") {
              return { ...room, q: `${form} costume` };
            }
            if (room.name === "Photography") {
              return { ...room, q: `${form} dance photography` };
            }
            if (room.name === "Stage design") {
              return { ...room, q: `${form} stage design lighting` };
            }
            if (room.name === "Abhinaya") {
              return { ...room, q: `${form} abhinaya expression` };
            }
            if (room.name === "Practice") {
              return { ...room, q: `${form} practice rehearsal` };
            }
            return room;
          }),
        );
      })
      .catch(() => undefined);
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <header className="max-w-xl">
        <p className="font-inscription text-[0.55rem] tracking-[0.2em] text-[#A8752B]">Gallery corridor</p>
        <h2 className="mt-1 font-display text-[clamp(1.6rem,3vw,2.2rem)] text-[#F4EBDD]">Explore</h2>
        <p className="mt-2 text-sm text-[#D8C6A7]/55">
          Archive rooms for <span className="text-[#E5A93C]/85">{danceForm}</span> — each opens a live Discover
          search with dancer-aware query expansion.
        </p>
      </header>

      <div className="mt-8 grid auto-rows-[170px] gap-3 sm:auto-rows-[190px] sm:grid-cols-2 lg:grid-cols-4">
        {rooms.map((room) => (
          <Link
            key={room.name}
            href={`/discover?q=${encodeURIComponent(room.q)}`}
            className={cn("explore-room-frame studio-tile group relative overflow-hidden", room.span)}
          >
            <Image
              src={room.image}
              alt=""
              fill
              className="media-zoom object-cover"
              sizes="(max-width:1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1012]/92 via-[#16495A]/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-[2] p-4">
              <h3 className="font-display text-xl text-[#F4EBDD]">{room.name}</h3>
              <p className="mt-1 max-w-[24ch] text-[0.78rem] text-[#D8C6A7]/55">{room.desc}</p>
              <span className="mt-2 inline-block font-inscription text-[0.55rem] tracking-[0.16em] text-[#E5A93C]/70 transition-transform group-hover:translate-x-1">
                Enter room →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-center font-inscription text-[0.65rem] tracking-[0.14em] text-[#A8752B]/80">
        Covers are local archive art. Results behind each room are live Unsplash + Pexels searches.
      </p>
    </div>
  );
}
