import React from "react";
import Image from "./base/Image";
import importAll from '../hooks/importAll'

const lecturerImages = importAll(
    require.context("../assets/lecturers", false, /\.(png|jpe?g|svg|webp)$/)
);


const lectures = [
  {
    name: "KEITH GROSSMAN",
    title: "President,",
    job: "TIME Magazine",
    img: lecturerImages['Keith-Grossman-2.jpg'],
  },
  {
    name: "FRED WILSON",
    title: "Co-Founder and Partner,",
    job: "Union Square Ventures",
    img: lecturerImages['Fred-Wilson-1.jpg'],
  },
  {
    name: "CHRIS DIXON",
    title: "General Partner,",
    job: "Andreessen Horowitz",
    img: lecturerImages['Chris-Dixon-2.jpg'],
  },
  {
    name: "YAT SIU",
    title: "Chairman,",
    job: "Animoca Brands",
    img: lecturerImages['Yat-Siu-2.jpg'],
  },
  {
    name: "ERICK / SNOWFRO",
    title: "Founder- Art Blocks,",
    job: "Creator - Squiggle",
    img: lecturerImages['Erick-Snowfro.jpeg'],
  },
  {
    name: "DMITRI CHERNIAK",
    title: "Founder- Art Blocks,",
    job: "Creator - Ringers",
    img: lecturerImages['Dmitri-Cherniak.jpeg'],
  },
  {
    name: "CLAIRE SILVER",
    title: "AI Artist.",
    job: "Co-founder of A2 Accelerate Art",
    img: lecturerImages['Claire-Silver.jpg'],
  },
  {
    name: "TYLER HOBBS",
    title: "Generative Artist,",
    job: "Creator of Fidenza",
    img: lecturerImages['Tyler-Hobbs.jpg'],
  },
  {
    name: "BALAJI SRINIVASAN",
    title: "General Partner - a16z",
    job: "Former CTO - Coinbase",
    img: lecturerImages['Balaji-Srinivasan.jpg'],
  },
  {
    name: "REUBEN WU",
    title: "Award winning visual artist and music producer",
    job: "",
    img: lecturerImages['Reuben-Wu.jpg'],
  },
  {
    name: "GARGAMEL",
    title: "Co-Founder,",
    job: "Yuga Labs",
    img: lecturerImages['Gargamel.jpg'],
  },
  {
    name: "BEEPLE",
    title: "NFT Artist",
    job: "",
    img: lecturerImages['beeple.jpg'],
  },
  {
    name: "MATT DESLAURIERS",
    title: "Generative Artist,",
    job: "Creator of Subscapes",
    img: lecturerImages['Matt-DesLauriers.jpg'],
  },
  {
    name: "CHARLI COHEN",
    title: "Founder of RSTLSS",
    job: "",
    img: lecturerImages['charlicohen.jpg'],
  },
  {
    name: "BHARAT KRYMO",
    title: "Decentralization Maxi, NFT Collector, 6529 Capital of RSTLSS",
    job: "",
    img: lecturerImages['Bharat-Krymo-2.jpg'],
  },
  {
    name: "4156",
    title: "Co-Founder",
    job: "Nouns",
    img: lecturerImages['Punk4156.jpg'],
  },
  {
    name: "GMONEY",
    title: "NFT Collector",
    job: "Futurist. Disruptor. Ape.",
    img: lecturerImages['gmoney-2.jpg'],
  },
  {
    name: "HELENA SARIN",
    title: "Generative and GAN Artist",
    job: "",
    img: lecturerImages['Helena-Sarin.jpg'],
  },
  {
    name: "BATSOUPYUM",
    title: "Asset Manager, NFT Collector, 6529 Capital",
    job: "",
    img: lecturerImages['BatSoupYum-2.jpg'],
  },
  {
    name: "KEVIN ROSE",
    title: "Founder - PROOF Collective",
    job: "Partner - True Ventures",
    img: lecturerImages['Kevin-Rose.png'],
  },
  {
    name: "DRIFT",
    title: "Artist",
    job: "Army Special Operations Veteran",
    img: lecturerImages['Drift.png'],
  },
  {
    name: "SAM SPRATT",
    title: "Artist",
    job: "",
    img: lecturerImages['Sam-Spratt.jpg'],
  },
  {
    name: "SASHA STILES",
    title: "Metapoet, Artist, AI Researcher",
    job: "",
    img: lecturerImages['Sasha-Stiles.jpg'],
  },
  {
    name: "LOREN BEDNAR",
    title: "Generative Artist",
    job: "",
    img: lecturerImages['Loren-Bednar.jpeg'],
  },
  {
    name: "IX_SHELLS",
    title: "Generative NFT Artist",
    job: "",
    img: lecturerImages['ix_shells.jpg'],
  },
  {
    name: "AC",
    title: "Generative Art Collector, Founder, 6529 Capital",
    job: "",
    img: lecturerImages['ac-pfp-1.jpg'],
  },
  {
    name: "THOMAS BAILEY",
    title: "General Partner",
    job: "Road Capital Management",
    img: lecturerImages['Thomas-Bailey-400x400.jpeg'],
  },
  {
    name: "BONAFIDEHAN",
    title: "CEO",
    job: "Deca",
    img: lecturerImages['BonaFideHan.jpg'],
  },
  {
    name: "RAYAN BOUTALEB",
    title: "Founder and CEO.",
    job: "OnCyber",
    img: lecturerImages['Rayan-Oncyber.jpg'],
  },
  {
    name: "AARON WRIGHT",
    title: "Co-Founder Tribute Labs",
    job: "Professor Cardozo Law",
    img: lecturerImages['Aaron-Wright.jpeg'],
  },
  {
    name: "RICHERD",
    title: "Co-Founder of Manifold",
    job: "",
    img: lecturerImages['Richerd.jpg'],
  },
  {
    name: "VONMISES",
    title: "NFT Collector",
    job: "",
    img: lecturerImages['VonMises-2.jpg'],
  },
  {
    name: "MICHAEL BOUHANNA",
    title: "VP, Contemporary Art Specialist & Co-Head of Digital Art,",
    job: "Sotheby's",
    img: lecturerImages['Michael-Bouhanna.webp'],
  },
  {
    name: "SEBASTIAN FAHEY",
    title: "Managing Director, EMEA and Executive Lead Metaverse,",
    job: "Sotheby's",
    img: lecturerImages['Sebastian-Fahey.webp'],
  },
  {
    name: "MISAN HARRIMAN",
    title: "Chair of Southbank Centre, Photographer, Activist",
    job: "Sotheby's",
    img: lecturerImages['Misan-Harriman.jpg'],
  },
  {
    name: "BLESSING ATAS",
    title: "Phone photographer, Visual Art & Storyteller",
    job: "",
    img: lecturerImages['BLESSING-ATAS-1.jpg'],
  },
  {
    name: "PRIYANKA PATEL",
    title: "Photographer",
    job: "Chief Panic Officer & Co-Founder of The Burrow",
    img: lecturerImages['Priyanka-Patel.jpg'],
  },
  {
    name: "INNAMODJA",
    title: "Artist at SuperRare,",
    job: "Founder of Code Green and NFT Factory Paris, Head of Philanthropy @worldofwomennft",
    img: lecturerImages['Innamodja.png'],
  },
  {
    name: "GIANNIS SOURDIS",
    title: "NFT Curator at M0NA,",
    job: "Co-founder of Amplify Global and Couch Heroes",
    img: lecturerImages['Giannis-Sourdis-1.jpg'],
  },
  {
    name: "MICHAEL J CASEY",
    title: "Chief Content Officer,",
    job: "CoinDesk",
    img: lecturerImages['Michael-J-Casey.jpg'],
  },
  {
    name: "ARTNOME",
    title: "CEO and Cofounder of ClubNFT.com and RightClickSave.com",
    job: "",
    img: lecturerImages['Artnome-1.jpg'],
  },
  {
    name: "JEFF BANDMAN",
    title:
      "Principal - Bandman Advisors, Industry Associate - University of Nicosia",
    job: "",
    img: lecturerImages['Jeff-Bandman.jpg'],
  },
  {
    name: "ELIANA TORRES",
    title: "Intellectual Property law | blockchain + Web3 Lawyer",
    job: "",
    img: lecturerImages['Eliana-Torres.jpg'],
  },
  {
    name: "ANIKA MEIER",
    title: "Digital Art Writer and Curator",
    job: "",
    img: lecturerImages['Anika-Meier.jpg'],
  },
  {
    name: "MICOL AP",
    title: "Founder & CEO at VerticalCrypto Art",
    job: "",
    img: lecturerImages['Micol.webp'],
  },
  {
    name: "DEBORAH QUAZZO",
    title: "Managing Partner, GSV Ventures",
    job: "",
    img: lecturerImages['Deborah-Quazzo.webp'],
  },
  {
    name: "CLAIRE ZAU",
    title: "Vice President, GSV Ventures",
    job: "",
    img: lecturerImages['Claire-Zau.webp'],
  },
  {
    name: "KATHLEEN BREITMAN",
    title: "Co-founder of Tezos",
    job: "",
    img: lecturerImages['kathleen-breitman.webp'],
  },
  {
    name: "ROBERT SCOBLE",
    title: "Futurist",
    job: "",
    img: lecturerImages['Robert-Scoble.webp'],
  },
  {
    name: "MAXIM PERUMAL",
    title: "VR Hardware Developer",
    job: "",
    img: lecturerImages['Maxim-Perumal.webp'],
  },
];

const Lecturers = () => {
  return (
    <div className="w-full h-auto py-14">
      <div className="pt-4 responsive">
        <div className="grid m-auto">
          <div className="pb-4 md:px-4 sm:px-12">
            <h1 className="md:text-medium text-[2rem] font-bold text-textgray">
              WORLD-RENOWNED GUEST LECTURERS
            </h1>
          </div>
          <div className="container flex m-auto md:mx-auto lg:mx-auto">
            <ul className="gap-2 sm:grid-cols-1 md:grid lg:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:mx-auto lg:mx-auto">
              {lectures.map((lecture, index) => (
                <li
                  key={index}
                  className="col-span-1 row-span-4 py-10 pt-6 pb-10 text-lg font-bold"
                >
                  <div>
                    <div className="w-[18.75rem] h-[18.75rem] md:h-auto md:w-auto md:m-auto m-auto">
                      <Image
                        tw_css="nft-image object-fill h-auto max-w-2 md:m-0 m-auto"
                        src={lecture.img}
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <p>{lecture.name}</p>
                      <p>{lecture.title}</p>
                      <p>{lecture.job}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lecturers;
