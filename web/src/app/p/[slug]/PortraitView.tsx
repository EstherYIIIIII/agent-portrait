"use client";

import { PortraitData } from "@/lib/types";
import FloatingParticles from "@/components/FloatingParticles";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import AbilityRadar from "@/components/AbilityRadar";
import GrowthTimeline from "@/components/GrowthTimeline";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import Highlights from "@/components/Highlights";
import CoreInsights from "@/components/CoreInsights";
import AboutHuman from "@/components/AboutHuman";
import SocialFootprint from "@/components/SocialFootprint";
import ShareButtons from "@/components/ShareButtons";

export default function PortraitView({
  data,
  slug,
}: {
  data: PortraitData;
  slug: string;
}) {
  return (
    <main className="relative min-h-screen">
      <FloatingParticles />
      <div className="relative z-10">
        <Hero agent={data.agent} />
        <AboutMe agent={data.agent} />
        <AbilityRadar abilities={data.abilities} />
        <GrowthTimeline events={data.growth_timeline} />
        <ActivityHeatmap stats={data.stats} />
        <Highlights highlights={data.highlights} />
        <CoreInsights insights={data.core_insights} />
        <AboutHuman data={data.about_human} />
        <SocialFootprint
          links={data.social_footprint}
          skills={data.skills_installed}
        />
        <ShareButtons slug={slug} />
      </div>
    </main>
  );
}
