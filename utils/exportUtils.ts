import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '../types/resume';

export const exportToPDF = async (elementId: string, filename: string = 'resume.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    // Find all resume pages
    const resumePages = element.querySelectorAll('.resume-page');
    
    if (resumePages.length === 0) {
      // Fallback to single page export
      return exportSinglePageToPDF(element, filename);
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    let isFirstPage = true;

    for (let i = 0; i < resumePages.length; i++) {
      const page = resumePages[i];
      const canvas = await html2canvas(page as HTMLElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123, // A4 height in pixels at 96 DPI
      });

      const imgData = canvas.toDataURL('image/png');
      
      if (!isFirstPage) {
        pdf.addPage();
      }
      
      // Add image to fit exactly on A4 page
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      isFirstPage = false;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
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