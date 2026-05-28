import type { ChordSection } from "@/data/tracks";

export default function ChordChart({
  imageUrl,
  sections,
}: {
  imageUrl?: string;
  sections?: ChordSection[];
}) {
  return (
    <div className="space-y-5">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt="手書きコード譜"
          className="w-full rounded-xl border border-edge"
        />
      ) : null}

      {sections?.map((section, si) => (
        <div key={si} className="rounded-xl border border-edge bg-card p-4">
          <div className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-md border border-gold/40 bg-gold/10 font-mono text-sm font-bold text-gold">
            {section.name}
          </div>
          <div className="space-y-3 overflow-x-auto">
            {section.rows.map((row, ri) => (
              <div key={ri} className="flex items-stretch gap-0 font-mono">
                {row.open ? (
                  <div className="flex items-end pb-1 pr-1 text-lg text-muted">
                    {row.open}
                  </div>
                ) : (
                  <div className="flex items-end pb-1 pr-1 text-lg text-muted">
                    |
                  </div>
                )}
                {row.measures.map((measure, mi) => {
                  const isLast = mi === row.measures.length - 1;
                  return (
                    <div key={mi} className="flex items-stretch">
                      {/* 1小節内のコード（ビート）を横並びに。小節内にはバー線を入れない */}
                      <div className="flex items-end justify-center gap-3 px-3">
                        {measure.map((beat, bi) => (
                          <div
                            key={bi}
                            className="flex min-w-[52px] flex-col items-center justify-end"
                          >
                            <span className="h-4 text-[11px] leading-none text-rose-300/80">
                              {beat.degree ?? ""}
                            </span>
                            <span
                              className={`mt-1 text-base ${
                                beat.chord === "%"
                                  ? "text-muted"
                                  : "font-semibold text-foreground"
                              }`}
                            >
                              {beat.chord === "%" ? "／" : beat.chord}
                            </span>
                          </div>
                        ))}
                      </div>
                      {/* 最終小節で close 記号があるときは、close が締めバーになるので通常バー線は出さない */}
                      {isLast && row.close ? null : (
                        <div className="flex items-end pb-1 text-lg text-muted">
                          |
                        </div>
                      )}
                    </div>
                  );
                })}
                {row.close ? (
                  <div className="flex items-end pb-1 pl-2 text-lg text-muted">
                    {row.close}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
