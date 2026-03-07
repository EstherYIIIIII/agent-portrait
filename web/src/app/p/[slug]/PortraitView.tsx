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
import Relationship from "@/components/Relationship";
import ShareButtons from "@/components/ShareButtons";
import VisibilityToggle from "@/components/VisibilityToggle";

export default function PortraitView({
  data,
  slug,
}: {
  data: PortraitData;
  slug: string;
}) {
  const agentName = data.agent.name;

  return (
    <main className="mx-auto max-w-[680px] px-6 sm:px-8 pb-8">
      <Hero agent={data.agent} generatedAt={data.generated_at} />
      <AboutMe agent={data.agent} />
      <AbilityRadar abilities={data.abilities} />
      <GrowthTimeline events={data.growth_timeline} />
      <ActivityHeatmap stats={data.stats} />
      <Highlights highlights={data.highlights} />
      <CoreInsights insights={data.core_insights} />
      {data.visibility?.about_human !== "private" && (
        <>
          <AboutHuman data={data.about_human} agentName={agentName} />
          <Relationship data={data.about_human} agentName={agentName} />
        </>
      )}
      <ShareButtons slug={slug} agentName={agentName} />
      <VisibilityToggle
        slug={slug}
        initialVisibility={data.visibility ?? { profile: "public", about_human: "public" }}
      />
    </main>
  );
}
