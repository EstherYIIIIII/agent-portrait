"use client";

import { PortraitData, LetterData } from "@/lib/types";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import AbilityRadar from "@/components/AbilityRadar";
import GrowthTimeline from "@/components/GrowthTimeline";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import Highlights from "@/components/Highlights";
import CoreInsights from "@/components/CoreInsights";
import AboutHuman from "@/components/AboutHuman";
import ShareButtons from "@/components/ShareButtons";
import ShareLetterButton from "@/components/ShareLetterButton";
import VisibilityToggle from "@/components/VisibilityToggle";

export default function PortraitView({
  data,
  slug,
  isOwner = false,
  letter,
  canSeeLetter,
  letterToken,
}: {
  data: PortraitData;
  slug: string;
  isOwner?: boolean;
  letter: LetterData | null;
  canSeeLetter: boolean;
  letterToken?: string;
}) {
  const agentName = data.agent.name;

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
      {canSeeLetter && letter ? (
        <div className="about-human-bg -mx-6 sm:-mx-8 px-6 sm:px-8">
          <AboutHuman data={letter.about_human} agentName={agentName} />
          {isOwner && letterToken && (
            <div className="pb-8">
              <ShareLetterButton slug={slug} letterToken={letterToken} agentName={agentName} />
            </div>
          )}
        </div>
      ) : letter ? (
        <div className="about-human-bg -mx-6 sm:-mx-8 px-6 sm:px-8">
          <div className="py-16 text-center">
            <p className="font-serif text-[18px] text-[var(--color-text-muted)] italic">
              这里有一封只给 TA 的信
            </p>
          </div>
        </div>
      ) : null}

      {/* === Footer === */}
      <ShareButtons slug={slug} agentName={agentName} />
      {isOwner && (
        <VisibilityToggle
          slug={slug}
          initialVisibility={data.visibility ?? { profile: "public", letter: "private" }}
          letterVisibility={letter?.visibility ?? "private"}
        />
      )}
    </main>
  );
}
