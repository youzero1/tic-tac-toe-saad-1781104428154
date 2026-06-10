type ScoreBoardProps = {
  scores: { X: number; O: number; draws: number };
};

export default function ScoreBoard({ scores }: ScoreBoardProps) {
  return (
    <div className="flex gap-4 w-72">
      <ScoreCard label="Player X" value={scores.X} color="indigo" />
      <ScoreCard label="Draws" value={scores.draws} color="slate" />
      <ScoreCard label="Player O" value={scores.O} color="rose" />
    </div>
  );
}

type ScoreCardProps = {
  label: string;
  value: number;
  color: 'indigo' | 'slate' | 'rose';
};

function ScoreCard({ label, value, color }: ScoreCardProps) {
  const colorMap = {
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-600',
    slate: 'bg-slate-50 border-slate-200 text-slate-600',
    rose: 'bg-rose-50 border-rose-200 text-rose-600',
  };

  return (
    <div
      className={`flex-1 flex flex-col items-center py-3 rounded-xl border-2 ${colorMap[color]}`}
    >
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs font-medium mt-1 text-center">{label}</span>
    </div>
  );
}
