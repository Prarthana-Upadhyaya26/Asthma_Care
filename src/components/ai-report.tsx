import ReactMarkdown from 'react-markdown';
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download, Printer } from 'lucide-react';
import './ai-report.css'; // Importing the external CSS file

export function AIReport({ report }: { report: string }) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'asthma-assessment-report.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-4 print:hidden">
        <Button variant="outline" onClick={handleDownload}>
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="w-4 h-4 mr-2" />
          Print Report
        </Button>
      </div>
      <Card className="p-6">
        <div className="prose max-w-none dark:prose-invert">
          <ReactMarkdown>{report}</ReactMarkdown>
        </div>
      </Card>
    </div>
  );
}
