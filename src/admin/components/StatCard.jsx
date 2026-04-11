export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="rounded-[28px] border border-[#c8ae72]/15 bg-[linear-gradient(180deg,rgba(38,25,24,0.95),rgba(20,14,19,0.96))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
      <p className="text-sm uppercase tracking-[0.22em] text-[#c8ae72]">
        {title}
      </p>
      <p className="mt-4 text-4xl font-bold text-[#fff2d2]">{value}</p>
      <p className="mt-3 text-sm leading-6 text-[#cfbea2]">{subtitle}</p>
    </div>
  );
}
