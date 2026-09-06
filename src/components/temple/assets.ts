/**
 * AadalArchive temple architecture asset registry.
 * Uses cleaned RGBA assets in /public/temple/clean (studio bg + openings removed).
 * Do NOT use REFERENCE_full_asset_sheet.png in the UI.
 */

const CLEAN = "/temple/clean";

export const TEMPLE = {
  pillar: {
    main: `${CLEAN}/pillar-main.png`,
    yali: `${CLEAN}/pillar-yali.png`,
    decorative: `${CLEAN}/pillar-decorative.png`,
    sculpted: `${CLEAN}/pillar-sculpted.png`,
    floral: `${CLEAN}/pillar-floral.png`,
    simple: `${CLEAN}/pillar-simple.png`,
  },
  arch: {
    grand: `${CLEAN}/grand-arch.png`,
    classic: `${CLEAN}/classic-arch.png`,
    large: `${CLEAN}/arch-large.png`,
    medium: `${CLEAN}/arch-medium.png`,
    small: `${CLEAN}/arch-small.png`,
    niche: `${CLEAN}/arch-niche.png`,
    doublePillar: `${CLEAN}/arch-double-pillar.png`,
    minimal: `${CLEAN}/arch-minimal.png`,
    decorative: `${CLEAN}/arch-decorative.png`,
    sideCorridor: `${CLEAN}/arch-side-corridor.png`,
    /** Wide portal — Featured Inspiration */
    span: `${CLEAN}/arch-span.png`,
  },
  detail: {
    cornice: `${CLEAN}/cornice-detail.png`,
    lotus: `${CLEAN}/lotus-motif.png`,
    yali: `${CLEAN}/yali-carving.png`,
    ceilingBracket: `${CLEAN}/ceiling-bracket.png`,
    baseMoulding: `${CLEAN}/base-moulding.png`,
    capital: `${CLEAN}/capital-detail.png`,
  },
  crest: {
    kalasa: `${CLEAN}/kalasa-top.png`,
    lotus: `${CLEAN}/lotus-crest.png`,
    deity: `${CLEAN}/deity-crest.png`,
  },
  border: {
    "01": `${CLEAN}/border-01.png`,
    "02": `${CLEAN}/border-02.png`,
    "03": `${CLEAN}/border-03.png`,
  },
} as const;

export type PillarVariant = keyof typeof TEMPLE.pillar;
export type ArchVariant = keyof typeof TEMPLE.arch;
export type OrnamentType =
  | keyof typeof TEMPLE.detail
  | `crest-${keyof typeof TEMPLE.crest}`;
export type BorderVariant = keyof typeof TEMPLE.border;
