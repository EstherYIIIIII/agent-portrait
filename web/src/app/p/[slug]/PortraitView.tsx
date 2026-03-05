"use client";

import { PortraitData } from "@/lib/types";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import AbilityRadar from "@/components/AbilityRadar";
import GrowthTimeline from "@/components/GrowthTimeline";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import Highlights from "@/components/Highlights";
import CoreInsights from "@/components/CoreInsights";
import AboutHuman from "@/components/AboutHuman";
import ShareButtons from "@/components/ShareButtons";

export default function PortraitView({
  data,
  slug,
}: {
  data: PortraitData;
  slug: string;
}) {
  return (
    <main className="mx-auto max-w-[680px] px-6 sm:px-8 pb-8">
      <Hero agent={data.agent} generatedAt={data.generated_at} />
      <AboutMe agent={data.agent} />
      <AbilityRadar abilities={data.abilities} />
      <GrowthTimeline events={data.growth_timeline} />
      <ActivityHeatmap stats={data.stats} />
      <Highlights highlights={data.highlights} />
      <CoreInsights insights={data.core_insights} />
      {data.visibility?.about_human !== "private" && <AboutHuman data={data.about_human} />}
      <ShareButtons slug={slug} />
    </main>
  );
}
