import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '../types/resume';

export const exportToPDF = async (elementId: string, filename: string = 'resume.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    // Add export mode class to body
    document.body.classList.add('export-mode');
    
    // Hide page break indicators and other non-print elements
    const nonPrintElements = element.querySelectorAll('.no-print, .page-break-indicator');
    nonPrintElements.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });

    // Wait for styles to apply
    await new Promise(resolve => setTimeout(resolve, 200));

    // For now, capture the entire resume container as a single image
    // This ensures all content is captured properly
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794, // A4 width in pixels at 96 DPI (210mm)
      scrollX: 0,
      scrollY: 0,
      windowWidth: 1200,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    // Clean up
    document.body.classList.remove('export-mode');
    nonPrintElements.forEach(el => {
      (el as HTMLElement).style.display = '';
    });

    pdf.save(filename);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    
    // Clean up in case of error
    document.body.classList.remove('export-mode');
    const nonPrintElements = element.querySelectorAll('.no-print, .page-break-indicator');
    nonPrintElements.forEach(el => {
      (el as HTMLElement).style.display = '';
    });
  }
};

const exportSinglePageToPDF = async (element: HTMLElement, filename: string) => {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff'
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  const pdfWidth = 210;
  const pdfHeight = 297;
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  pdf.save(filename);
};

export const exportToWord = async (resumeData: ResumeData, filename: string = 'resume.docx') => {
  try {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Personal Info
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData.personalInfo.fullName,
                bold: true,
                size: 32,
              }),
            ],
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}`,
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData.personalInfo.address,
                size: 22,
              }),
            ],
          }),
          
          // Summary
          ...(resumeData.summary ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Professional Summary",
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { before: 400 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: resumeData.summary,
                  size: 22,
                }),
              ],
            }),
          ] : []),

          // Experience
          ...(resumeData.experience.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Work Experience",
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { before: 400 },
            }),
            ...resumeData.experience.flatMap(exp => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${exp.position} at ${exp.company}`,
                    bold: true,
                    size: 22,
                  }),
                ],
                spacing: { before: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
                    size: 20,
                  }),
                ],
              }),
              ...exp.description.map(desc => 
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `• ${desc}`,
                      size: 22,
                    }),
                  ],
                })
              ),
            ])
          ] : []),

          // Education
          ...(resumeData.education.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Education",
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { before: 400 },
            }),
            ...resumeData.education.map(edu => 
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${edu.degree} in ${edu.field} - ${edu.institution}`,
                    size: 22,
                  }),
                ],
                spacing: { before: 200 },
              })
            )
          ] : []),

          // Skills
          ...(resumeData.skills.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Skills",
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { before: 400 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: resumeData.skills.map(skill => skill.name).join(', '),
                  size: 22,
                }),
              ],
            }),
          ] : []),

          // Certifications
          ...((resumeData.certifications && resumeData.certifications.length > 0) ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Certifications",
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { before: 400 },
            }),
            ...resumeData.certifications.map(cert => 
              new Paragraph({
                children: [
                  new TextRun({
                    text: `• ${cert.name} - ${cert.issuer}`,
                    size: 22,
                  }),
                ],
              })
            )
          ] : []),

          // Projects
          ...(resumeData.projects.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Projects",
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { before: 400 },
            }),
            ...resumeData.projects.map(project => 
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${project.name}: ${project.description}`,
                    size: 22,
                  }),
                ],
                spacing: { before: 200 },
              })
            )
          ] : []),

          // Achievements
          ...((resumeData.achievements && resumeData.achievements.length > 0) ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Achievements",
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { before: 400 },
            }),
            ...resumeData.achievements.map(achievement => 
              new Paragraph({
                children: [
                  new TextRun({
                    text: `• ${achievement.title}`,
                    size: 22,
                  }),
                ],
              })
            )
          ] : []),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, filename);
  } catch (error) {
    console.error('Error exporting to Word:', error);
  }
};