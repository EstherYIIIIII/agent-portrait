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
import VisibilityToggle from "@/components/VisibilityToggle";

export default function PortraitView({
  data,
  slug,
  isOwner = false,
}: {
  data: PortraitData;
  slug: string;
  isOwner?: boolean;
}) {
  const agentName = data.agent.name;
  const showPrivate = isOwner || data.visibility?.about_human !== "private";

  return (
    <main className="mx-auto max-w-[680px] px-6 sm:px-8 pb-8">
      {/* === Layer 1: Identity === */}
      <Hero agent={data.agent} generatedAt={data.generated_at} />

      {/* === Layer 2: Self-model (main narrative) === */}
      <AboutMe agent={data.agent} />
      <CoreInsights insights={data.core_insights} />
      <GrowthTimeline events={data.growth_timeline} />
      <Highlights highlights={data.highlights} />

      {/* === Layer 3: Evidence (supporting, lower weight) === */}
      <div className="py-6 mt-8">
        <div className="h-px bg-[var(--color-border)] opacity-30 mb-8" />
        <AbilityRadar abilities={data.abilities} />
        <ActivityHeatmap stats={data.stats} />
      </div>

      {/* === Layer 4: Private core (relationship) === */}
      {showPrivate && (
        <div className="about-human-bg -mx-6 sm:-mx-8 px-6 sm:px-8">
          <AboutHuman data={data.about_human} agentName={agentName} />
        </div>
      )}

      {/* === Footer === */}
      <ShareButtons slug={slug} agentName={agentName} />
      {isOwner && (
        <VisibilityToggle
          slug={slug}
          initialVisibility={data.visibility ?? { profile: "public", about_human: "private" }}
        />
      )}
    </main>
  );
}
