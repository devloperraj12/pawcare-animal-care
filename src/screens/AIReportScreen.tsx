import { useState } from 'react';
import {
  Upload,
  FileText,
  Sparkles,
  ScanLine,
  PawPrint,
  Pill,
  Stethoscope,
  CalendarClock,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  X,
} from 'lucide-react';
import { aiSummary } from '@/data';

type Phase = 'upload' | 'processing' | 'result';

export default function AIReportScreen() {
  const [phase, setPhase] = useState<Phase>('upload');
  const [fileName, setFileName] = useState('Bruno_Blood_Report.pdf');

  const handleUpload = () => {
    setFileName('Bruno_Blood_Report.pdf');
    setPhase('processing');
    setTimeout(() => setPhase('result'), 2800);
  };

  const handleReset = () => {
    setPhase('upload');
  };

  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 sm:px-6 py-6">
      {phase === 'upload' && <UploadPhase fileName={fileName} onUpload={handleUpload} />}
      {phase === 'processing' && <ProcessingPhase fileName={fileName} />}
      {phase === 'result' && <ResultPhase onReset={handleReset} />}
    </div>
  );
}

function UploadPhase({ fileName, onUpload }: { fileName: string; onUpload: () => void }) {
  return (
    <div>
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-lg shadow-primary-500/20">
          <Sparkles className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-neutral-900">AI Report Assistant</h1>
        <p className="mt-1.5 max-w-md mx-auto text-sm text-neutral-500">
          Upload your pet's medical report and get a simple, structured summary you can actually understand.
        </p>
      </div>

      {/* Upload dropzone */}
      <div className="mt-8">
        <div className="rounded-2xl border-2 border-dashed border-neutral-300 bg-white p-8 text-center transition-colors hover:border-primary-300">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
            <Upload className="h-8 w-8 text-primary-500" />
          </div>
          <p className="mt-4 text-sm font-semibold text-neutral-700">
            Drag and drop your report here
          </p>
          <p className="mt-1 text-xs text-neutral-400">PDF, JPG, or PNG · Up to 10 MB</p>

          {/* Pre-filled example file */}
          <div className="mt-5 mx-auto flex max-w-xs items-center gap-2.5 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-error-50 text-error-600">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-neutral-800">{fileName}</p>
              <p className="text-xs text-neutral-400">Example file · 248 KB</p>
            </div>
            <CheckCircle2 className="h-5 w-5 text-success-500" />
          </div>
        </div>

        <button
          onClick={onUpload}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-600"
        >
          <Sparkles className="h-5 w-5" />
          Analyse Report
        </button>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-warning-200 bg-warning-50 p-4">
        <AlertTriangle className="h-5 w-5 shrink-0 text-warning-600" />
        <p className="text-xs leading-relaxed text-warning-800">
          AI-generated information is for understanding the document only and does not provide a diagnosis or replace veterinary advice. Always consult a qualified veterinarian for medical decisions.
        </p>
      </div>
    </div>
  );
}

function ProcessingPhase({ fileName }: { fileName: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative flex h-32 w-32 items-center justify-center">
        {/* Scanning frame */}
        <div className="absolute inset-0 rounded-2xl border-2 border-primary-200 bg-primary-50/30" />
        <div className="absolute inset-x-2 top-2 h-0.5 bg-primary-500 shadow-[0_0_8px] shadow-primary-400 animate-scan" />
        <FileText className="h-14 w-14 text-primary-400" />
      </div>

      <h2 className="mt-6 text-lg font-bold text-neutral-900">Analysing report…</h2>
      <p className="mt-1 text-sm text-neutral-500">{fileName}</p>

      <div className="mt-6 w-full max-w-xs space-y-2.5">
        {['Reading document', 'Extracting medical data', 'Generating summary'].map((step, i) => (
          <div key={step} className="flex items-center gap-2.5">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary-500" style={{ animationDelay: `${i * 0.4}s` }} />
            </div>
            <span className="text-sm font-medium text-neutral-600">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultPhase({ onReset }: { onReset: () => void }) {
  const s = aiSummary;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-50 text-success-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-neutral-900">Summary Ready</h1>
            <p className="text-xs text-neutral-400">Bruno_Blood_Report.pdf</p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-semibold text-neutral-500 hover:bg-neutral-100 transition-colors"
        >
          <X className="h-4 w-4" />
          New
        </button>
      </div>

      {/* Animal overview card */}
      <div className="mt-5 flex items-center gap-3.5 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-card">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
          <PawPrint className="h-7 w-7" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-extrabold text-neutral-900">{s.animalName}</h2>
          <p className="text-sm text-neutral-500">
            {s.species} · {s.breed}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-neutral-400">Report Type</p>
          <p className="text-sm font-semibold text-neutral-700">{s.reportType}</p>
          <p className="text-xs text-neutral-400">{s.dateOfReport}</p>
        </div>
      </div>

      {/* Key Findings */}
      <SectionCard icon={<ScanLine className="h-4 w-4 text-primary-500" />} title="Key Findings">
        <ul className="space-y-2.5">
          {s.keyFindings.map((finding, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
              {finding}
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* Medications */}
      <SectionCard icon={<Pill className="h-4 w-4 text-primary-500" />} title="Medications Mentioned">
        <div className="space-y-2.5">
          {s.medications.map((med, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-xl bg-neutral-50 p-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-800">{med.name}</p>
                <p className="text-xs text-neutral-500">{med.dosage}</p>
              </div>
              <span className="shrink-0 rounded-lg bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700">
                {med.duration}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Follow-up */}
      <SectionCard icon={<CalendarClock className="h-4 w-4 text-primary-500" />} title="Follow-up Information">
        <p className="text-sm leading-relaxed text-neutral-600">{s.followUp}</p>
      </SectionCard>

      {/* Questions to ask */}
      <SectionCard icon={<HelpCircle className="h-4 w-4 text-primary-500" />} title="Questions to Ask Your Veterinarian">
        <div className="space-y-2">
          {s.questionsToAsk.map((q, i) => (
            <div key={i} className="flex items-start gap-2.5 rounded-xl border border-neutral-100 p-3 text-sm leading-relaxed text-neutral-600">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                {i + 1}
              </span>
              {q}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Disclaimer */}
      <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-warning-200 bg-warning-50 p-4">
        <AlertTriangle className="h-5 w-5 shrink-0 text-warning-600" />
        <p className="text-xs leading-relaxed text-warning-800">
          AI-generated information is for understanding the document only and does not provide a diagnosis or replace veterinary advice. Always consult a qualified veterinarian for medical decisions.
        </p>
      </div>

      {/* Talk to a vet CTA */}
      <button
        onClick={onReset}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3 text-sm font-bold text-primary-700 transition-colors hover:bg-primary-100"
      >
        <Stethoscope className="h-5 w-5" />
        Find a Veterinarian Near You
      </button>
    </div>
  );
}

function SectionCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-card">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-400">{title}</h2>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
