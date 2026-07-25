import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import {
  BsGraphUp, BsChatDots, BsShieldCheck, BsLightbulb,
  BsChevronDown, BsChevronUp, BsStar, BsStarFill,
  BsCheckCircle, BsXCircle, BsArrowLeft, BsDownload,
  BsClock, BsBarChart, BsTrophy,
  BsFilePdf
} from 'react-icons/bs'
import { FaBrain, FaComments, FaChartLine, FaUserCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const Step3Report = ({ report }) => {

   useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const navigate = useNavigate()
  const [expandedQuestion, setExpandedQuestion] = useState(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const reportRef = useRef(null)

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-emerald-600'
    if (score >= 6) return 'text-blue-600'
    if (score >= 4) return 'text-amber-600'
    if (score > 0) return 'text-red-600'
    return 'text-gray-400'
  }

  const getScoreBg = (score) => {
    if (score >= 8) return 'bg-emerald-50 border-emerald-200'
    if (score >= 6) return 'bg-blue-50 border-blue-200'
    if (score >= 4) return 'bg-amber-50 border-amber-200'
    if (score > 0) return 'bg-red-50 border-red-200'
    return 'bg-gray-50 border-gray-200'
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-emerald-100 text-emerald-700'
      case 'medium': return 'bg-amber-100 text-amber-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getScoreBarColor = (score) => {
    if (score >= 8) return 'from-emerald-500 to-green-500'
    if (score >= 6) return 'from-blue-500 to-cyan-500'
    if (score >= 4) return 'from-amber-500 to-orange-500'
    if (score > 0) return 'from-red-500 to-pink-500'
    return 'from-gray-300 to-gray-400'
  }

  const renderStars = (score) => {
    const maxStars = 5
    const filledStars = Math.round((score / 10) * maxStars)
    return (
      <div className="flex gap-1">
        {[...Array(maxStars)].map((_, index) => (
          index < filledStars ? (
            <BsStarFill key={index} className="text-amber-400" size={16} />
          ) : (
            <BsStar key={index} className="text-gray-300" size={16} />
          )
        ))}
      </div>
    )
  }

//  const downloadPDF = async () => {
//   setIsDownloading(true)

//   const previousExpanded = expandedQuestion
//   const allQuestionsExpanded = report.questionWiseScore?.map((_, index) => index)
//   setExpandedQuestion(allQuestionsExpanded)

//   await new Promise(resolve => setTimeout(resolve, 500))

//   const pdf = new jsPDF('p', 'mm', 'a4')
//   const pageWidth = pdf.internal.pageSize.getWidth()
//   const pageHeight = pdf.internal.pageSize.getHeight()
//   const marginX = 18
//   const contentWidth = pageWidth - marginX * 2

//   // ---- Restrained, "corporate" palette ----
//   const ink = [23, 23, 23]          // near-black, primary text
//   const inkMuted = [100, 100, 105]  // secondary text
//   const inkFaint = [150, 150, 155]  // tertiary / footer text
//   const accent = [30, 41, 59]       // slate-800, used sparingly (rules, headers)
//   const line = [222, 224, 228]      // hairline borders
//   const panelBg = [250, 250, 251]   // near-white panel fill
//   const white = [255, 255, 255]

//   let y = 20

//   const checkPageBreak = (height) => {
//     if (y + height > pageHeight - 22) {
//       pdf.addPage()
//       y = 20
//       return true
//     }
//     return false
//   }

//   const hr = (yPos, color = line, weight = 0.3) => {
//     pdf.setDrawColor(...color)
//     pdf.setLineWidth(weight)
//     pdf.line(marginX, yPos, pageWidth - marginX, yPos)
//   }

//   const eyebrow = (text, yPos) => {
//     pdf.setTextColor(...inkMuted)
//     pdf.setFontSize(8.5)
//     pdf.setFont('helvetica', 'bold')
//     pdf.text(text.toUpperCase(), marginX, yPos, { charSpace: 0.5 })
//   }

//   // ============ HEADER (letterhead style, not a filled banner) ============
//   pdf.setTextColor(...ink)
//   pdf.setFontSize(20)
//   pdf.setFont('helvetica', 'bold')
//   pdf.text('Interview Assessment Report', marginX, y)

//   pdf.setFontSize(9)
//   pdf.setFont('helvetica', 'normal')
//   pdf.setTextColor(...inkMuted)
//   pdf.text('InterviewIQ.AI', pageWidth - marginX, y - 4, { align: 'right' })
//   const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
//   pdf.text(dateStr, pageWidth - marginX, y, { align: 'right' })

//   y += 6
//   hr(y, accent, 0.8)
//   y += 10

//   // Candidate / role meta row
//   pdf.setFontSize(9)
//   pdf.setFont('helvetica', 'bold')
//   pdf.setTextColor(...inkMuted)
//   pdf.text('ROLE', marginX, y)
//   pdf.setFont('helvetica', 'normal')
//   pdf.setTextColor(...ink)
//   pdf.setFontSize(11)
//   pdf.text(report.role || 'N/A', marginX, y + 6)

//   y += 16
//   hr(y)
//   y += 12

//   // ============ SCORE SUMMARY (table, not colored cards) ============
//   eyebrow('Score Summary', y)
//   y += 7

//   const summaryScores = [
//     { label: 'Overall', value: report.finalScore },
//     { label: 'Communication', value: report.communication },
//     { label: 'Confidence', value: report.confidence },
//     { label: 'Correctness', value: report.correctness },
//   ]

//   const colWidth = contentWidth / summaryScores.length
//   const summaryTop = y

//   summaryScores.forEach((s, i) => {
//     const x = marginX + colWidth * i
//     if (i > 0) {
//       pdf.setDrawColor(...line)
//       pdf.setLineWidth(0.2)
//       pdf.line(x, summaryTop, x, summaryTop + 22)
//     }
//     pdf.setTextColor(...ink)
//     pdf.setFontSize(20)
//     pdf.setFont('helvetica', 'bold')
//     pdf.text(`${s.value}`, x + colWidth / 2, summaryTop + 12, { align: 'center' })
//     pdf.setFontSize(8.5)
//     pdf.setFont('helvetica', 'normal')
//     pdf.setTextColor(...inkMuted)
//     pdf.text(`/ 10  ${s.label}`.toUpperCase(), x + colWidth / 2, summaryTop + 19, { align: 'center' })
//   })

//   y = summaryTop + 26
//   hr(y)
//   y += 12

//   // ============ PERFORMANCE BREAKDOWN (thin bars, single tone) ============
//   eyebrow('Performance Breakdown', y)
//   y += 8

//   const metrics = [
//     { label: 'Communication Skills', value: report.communication },
//     { label: 'Confidence Level', value: report.confidence },
//     { label: 'Technical Accuracy', value: report.correctness },
//   ]

//   metrics.forEach((m) => {
//     checkPageBreak(14)
//     pdf.setFontSize(9.5)
//     pdf.setFont('helvetica', 'normal')
//     pdf.setTextColor(...ink)
//     pdf.text(m.label, marginX, y)
//     pdf.setFont('helvetica', 'bold')
//     pdf.text(`${m.value}/10`, pageWidth - marginX, y, { align: 'right' })

//     const barY = y + 3
//     pdf.setFillColor(...line)
//     pdf.roundedRect(marginX, barY, contentWidth, 1.6, 0.8, 0.8, 'F')
//     pdf.setFillColor(...accent)
//     const barWidth = (contentWidth * m.value) / 10
//     if (barWidth > 0) pdf.roundedRect(marginX, barY, barWidth, 1.6, 0.8, 0.8, 'F')

//     y += 13
//   })

//   y += 4
//   hr(y)
//   y += 12

//   // ============ QUESTION-WISE ANALYSIS ============
//   checkPageBreak(14)
//   eyebrow('Question-by-Question Analysis', y)
//   y += 9

//   const difficultyLabel = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }

//   report.questionWiseScore?.forEach((question, qIndex) => {
//     // ---- Measure content first so the panel height is always correct ----
//     pdf.setFontSize(10.5)
//     pdf.setFont('helvetica', 'bold')
//     const questionLines = pdf.splitTextToSize(question.question, contentWidth - 4)

//     pdf.setFontSize(9)
//     pdf.setFont('helvetica', 'normal')
//     const answerLines = pdf.splitTextToSize(question.answer || 'No answer provided', contentWidth - 4)
//     const feedbackLines = pdf.splitTextToSize(question.feedback || '', contentWidth - 4)

//     const headerBlockH = 12                       // Q# / difficulty / time row
//     const questionBlockH = questionLines.length * 5 + 4
//     const subScoreBlockH = 7
//     const answerLabelH = 5
//     const answerBlockH = answerLines.length * 4.6 + 3
//     const feedbackLabelH = 5
//     const feedbackBlockH = feedbackLines.length * 4.6

//     const innerPadding = 8
//     const panelHeight = innerPadding * 2 + headerBlockH + questionBlockH + subScoreBlockH +
//       answerLabelH + answerBlockH + feedbackLabelH + feedbackBlockH

//     checkPageBreak(panelHeight + 6)

//     const panelTop = y
//     pdf.setFillColor(...panelBg)
//     pdf.setDrawColor(...line)
//     pdf.setLineWidth(0.3)
//     pdf.roundedRect(marginX, panelTop, contentWidth, panelHeight, 2, 2, 'FD')

//     let cy = panelTop + innerPadding

//     // Q# + difficulty (text label, not a filled badge) + time limit
//     pdf.setTextColor(...ink)
//     pdf.setFontSize(10)
//     pdf.setFont('helvetica', 'bold')
//     pdf.text(`Question ${qIndex + 1}`, marginX + 6, cy)

//     pdf.setFontSize(8)
//     pdf.setFont('helvetica', 'normal')
//     pdf.setTextColor(...inkMuted)
//     const diffText = `${difficultyLabel[question.difficulty] || question.difficulty || ''}  ·  Time limit ${question.timeLimit}s`
//     pdf.text(diffText, marginX + 6, cy + 5)

//     // Score, right-aligned
//     pdf.setTextColor(...ink)
//     pdf.setFontSize(13)
//     pdf.setFont('helvetica', 'bold')
//     pdf.text(`${question.score}/10`, marginX + contentWidth - 6, cy + 2, { align: 'right' })

//     cy += headerBlockH + 2

//     // Question text
//     pdf.setTextColor(...ink)
//     pdf.setFontSize(10.5)
//     pdf.setFont('helvetica', 'bold')
//     pdf.text(questionLines, marginX + 6, cy)
//     cy += questionBlockH

//     // Sub-scores as a single muted line
//     pdf.setFontSize(8.5)
//     pdf.setFont('helvetica', 'normal')
//     pdf.setTextColor(...inkMuted)
//     pdf.text(
//       `Communication ${question.communication}/10   ·   Confidence ${question.confidence}/10   ·   Correctness ${question.correctness}/10`,
//       marginX + 6,
//       cy
//     )
//     cy += subScoreBlockH

//     // Answer
//     pdf.setFontSize(8.5)
//     pdf.setFont('helvetica', 'bold')
//     pdf.setTextColor(...ink)
//     pdf.text('Answer', marginX + 6, cy)
//     cy += answerLabelH
//     pdf.setFont('helvetica', 'normal')
//     pdf.setTextColor(...inkMuted)
//     pdf.setFontSize(9)
//     pdf.text(answerLines, marginX + 6, cy)
//     cy += answerBlockH

//     // Feedback
//     pdf.setFontSize(8.5)
//     pdf.setFont('helvetica', 'bold')
//     pdf.setTextColor(...ink)
//     pdf.text('AI Feedback', marginX + 6, cy)
//     cy += feedbackLabelH
//     pdf.setFont('helvetica', 'normal')
//     pdf.setTextColor(...inkMuted)
//     pdf.setFontSize(9)
//     pdf.text(feedbackLines, marginX + 6, cy)

//     y = panelTop + panelHeight + 6
//   })

//   // ============ FOOTER ============
//   const totalPages = pdf.internal.getNumberOfPages()
//   for (let i = 1; i <= totalPages; i++) {
//     pdf.setPage(i)
//     hr(pageHeight - 15, line, 0.2)
//     pdf.setTextColor(...inkFaint)
//     pdf.setFontSize(7.5)
//     pdf.setFont('helvetica', 'normal')
//     pdf.text('Generated by InterviewIQ.AI', marginX, pageHeight - 10)
//     pdf.text(`Page ${i} of ${totalPages}`, pageWidth - marginX, pageHeight - 10, { align: 'right' })
//   }

//   const fileName = `Interview_Report_${report.role || 'Unknown'}_${new Date().toISOString().split('T')[0]}.pdf`
//   pdf.save(fileName)

//   setExpandedQuestion(previousExpanded)
//   setIsDownloading(false)
// }

const downloadPDF = async () => {
  setIsDownloading(true)

  const previousExpanded = expandedQuestion
  const allQuestionsExpanded = report.questionWiseScore?.map((_, index) => index)
  setExpandedQuestion(allQuestionsExpanded)

  await new Promise(resolve => setTimeout(resolve, 500))

  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const marginX = 20
  const contentWidth = pageWidth - marginX * 2
  const docTitle = 'Interview Assessment Report'

  // ---- Palette: near-monochrome, one accent used only for rules/labels ----
  const ink = [20, 20, 22]
  const inkMuted = [95, 97, 102]
  const inkFaint = [160, 162, 167]
  const accent = [37, 47, 63]        // deep slate — headers, rules
  const line = [214, 216, 220]
  const lineFaint = [235, 236, 238]
  const panelBg = [252, 252, 253]

  let y = 0
  let sectionNum = 0
  let contentStartPage = 2 // page 1 is the cover

  const hr = (yPos, color = line, weight = 0.3) => {
    pdf.setDrawColor(...color)
    pdf.setLineWidth(weight)
    pdf.line(marginX, yPos, pageWidth - marginX, yPos)
  }

  const addRunningHeader = () => {
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(...inkFaint)
    pdf.text(docTitle.toUpperCase(), marginX, 12, { charSpace: 0.4 })
    pdf.text((report.role || '').toUpperCase(), pageWidth - marginX, 12, { align: 'right', charSpace: 0.4 })
    pdf.setDrawColor(...lineFaint)
    pdf.setLineWidth(0.2)
    pdf.line(marginX, 15, pageWidth - marginX, 15)
  }

  const newContentPage = () => {
    pdf.addPage()
    addRunningHeader()
    y = 24
  }

  const checkPageBreak = (height) => {
    if (y + height > pageHeight - 24) {
      newContentPage()
      return true
    }
    return false
  }

  const sectionHeading = (title) => {
    sectionNum += 1
    checkPageBreak(16)
    pdf.setFont('times', 'bold')
    pdf.setFontSize(13)
    pdf.setTextColor(...ink)
    pdf.text(`${sectionNum}. ${title}`, marginX, y)
    y += 3
    hr(y + 2, accent, 0.6)
    y += 10
  }

  // ============ COVER PAGE ============
  pdf.setFillColor(...accent)
  pdf.rect(0, 0, pageWidth, 4, 'F') // top accent bar only — restrained, not a full banner

  pdf.setTextColor(...inkFaint)
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  pdf.text('CONFIDENTIAL', marginX, 24, { charSpace: 0.8 })
  pdf.text('CANDIDATE ASSESSMENT', pageWidth - marginX, 24, { align: 'right', charSpace: 0.8 })

  pdf.setTextColor(...ink)
  pdf.setFont('times', 'bold')
  pdf.setFontSize(30)
  const titleLines = pdf.splitTextToSize(docTitle, contentWidth - 20)
  pdf.text(titleLines, marginX, 90)

  pdf.setFont('times', 'normal')
  pdf.setFontSize(13)
  pdf.setTextColor(...inkMuted)
  pdf.text(report.role || 'N/A', marginX, 90 + titleLines.length * 12 + 8)

  const coverDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')
  pdf.text(coverDate, marginX, 90 + titleLines.length * 12 + 16)

  // Cover summary strip
  const coverStripY = pageHeight - 60
  hr(coverStripY, line, 0.3)
  const coverScores = [
    { label: 'Overall Score', value: `${report.finalScore}/10` },
    { label: 'Communication', value: `${report.communication}/10` },
    { label: 'Confidence', value: `${report.confidence}/10` },
    { label: 'Correctness', value: `${report.correctness}/10` },
  ]
  const stripCol = contentWidth / coverScores.length
  coverScores.forEach((s, i) => {
    const x = marginX + stripCol * i
    pdf.setFont('times', 'bold')
    pdf.setFontSize(16)
    pdf.setTextColor(...ink)
    pdf.text(s.value, x, coverStripY + 14)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8)
    pdf.setTextColor(...inkMuted)
    pdf.text(s.label.toUpperCase(), x, coverStripY + 20, { charSpace: 0.3 })
  })

  pdf.setFontSize(7.5)
  pdf.setTextColor(...inkFaint)
  pdf.setFont('helvetica', 'normal')
  pdf.text('Generated by InterviewIQ.AI  ·  Automated assessment — for internal review purposes', marginX, pageHeight - 14)

  // ============ CONTENT START ============
  newContentPage()

  // ---- 1. Executive Summary ----
  sectionHeading('Executive Summary')

  const performanceWord = (v) => (v >= 8 ? 'strong' : v >= 6 ? 'solid' : v >= 4 ? 'developing' : 'limited')
  const summaryText =
    `The candidate completed an assessment for the ${report.role || 'target'} role, achieving an overall score of ` +
    `${report.finalScore}/10. Communication skills were rated ${performanceWord(report.communication)} at ` +
    `${report.communication}/10, confidence was ${performanceWord(report.confidence)} at ${report.confidence}/10, and ` +
    `technical correctness was ${performanceWord(report.correctness)} at ${report.correctness}/10. ` +
    `${report.questionWiseScore?.length || 0} question(s) were evaluated as part of this assessment. ` +
    `Detailed scoring and question-level feedback follow in the sections below.`

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(9.5)
  pdf.setTextColor(...inkMuted)
  const summaryLines = pdf.splitTextToSize(summaryText, contentWidth)
  pdf.text(summaryLines, marginX, y, { lineHeightFactor: 1.5 })
  y += summaryLines.length * 5.2 + 12

  // ---- 2. Score Overview ----
  sectionHeading('Score Overview')

  const summaryScores = [
    { label: 'Overall', value: report.finalScore },
    { label: 'Communication', value: report.communication },
    { label: 'Confidence', value: report.confidence },
    { label: 'Correctness', value: report.correctness },
  ]
  const colWidth = contentWidth / summaryScores.length
  const summaryTop = y
  hr(summaryTop, lineFaint, 0.3)
  summaryScores.forEach((s, i) => {
    const x = marginX + colWidth * i
    if (i > 0) {
      pdf.setDrawColor(...lineFaint)
      pdf.setLineWidth(0.2)
      pdf.line(x, summaryTop, x, summaryTop + 24)
    }
    pdf.setFont('times', 'bold')
    pdf.setFontSize(19)
    pdf.setTextColor(...ink)
    pdf.text(`${s.value}`, x + colWidth / 2, summaryTop + 13, { align: 'center' })
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8)
    pdf.setTextColor(...inkMuted)
    pdf.text(`OUT OF 10 — ${s.label.toUpperCase()}`, x + colWidth / 2, summaryTop + 20, { align: 'center' })
  })
  y = summaryTop + 24
  hr(y, lineFaint, 0.3)
  y += 14

  // ---- 3. Performance Breakdown ----
  sectionHeading('Performance Breakdown')

  const metrics = [
    { label: 'Communication Skills', value: report.communication },
    { label: 'Confidence Level', value: report.confidence },
    { label: 'Technical Accuracy', value: report.correctness },
  ]
  metrics.forEach((m) => {
    checkPageBreak(15)
    pdf.setFontSize(9.5)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(...ink)
    pdf.text(m.label, marginX, y)
    pdf.setFont('times', 'bold')
    pdf.text(`${m.value}/10`, pageWidth - marginX, y, { align: 'right' })

    const barY = y + 3.5
    pdf.setFillColor(...lineFaint)
    pdf.rect(marginX, barY, contentWidth, 1.4, 'F')
    pdf.setFillColor(...accent)
    const barWidth = (contentWidth * m.value) / 10
    if (barWidth > 0) pdf.rect(marginX, barY, barWidth, 1.4, 'F')

    y += 14
  })
  y += 4

  // ---- 4. Question-by-Question Analysis ----
  sectionHeading('Question-by-Question Analysis')

  const difficultyLabel = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }

 report.questionWiseScore?.forEach((question, qIndex) => {
    pdf.setFontSize(10.5)
    pdf.setFont('helvetica', 'bold')
    const questionLines = pdf.splitTextToSize(question.question, contentWidth - 8)

    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    const answerLines = pdf.splitTextToSize(question.answer || 'No answer provided', contentWidth - 8)
    const feedbackLines = pdf.splitTextToSize(question.feedback || '', contentWidth - 8)

    const rowH = (label, textLines, lh = 4.6) => 5 + textLines.length * lh + 4

    const headerRowH = 12
    const questionRowH = questionLines.length * 5 + 6
    const subScoreRowH = 9
    const answerRowH = rowH('Answer', answerLines)
    const feedbackRowH = rowH('AI Feedback', feedbackLines)
    const totalH = headerRowH + questionRowH + subScoreRowH + answerRowH + feedbackRowH

    checkPageBreak(totalH + 10)

    const top = y
    pdf.setDrawColor(...line)
    pdf.setLineWidth(0.3)
    pdf.setFillColor(...panelBg)
    pdf.rect(marginX, top, contentWidth, totalH, 'FD')

    let cy = top

    // Header row — plain text on the panel background, no fill
    pdf.setTextColor(...ink)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(10)
    pdf.text(`Question ${qIndex + 1}`, marginX + 5, cy + 7.5)

    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8)
    pdf.setTextColor(...inkMuted)
    const metaText = `${difficultyLabel[question.difficulty] || question.difficulty || ''}   ·   Time limit ${question.timeLimit}s`
    pdf.text(metaText, marginX + 38, cy + 7.5)

    pdf.setFont('times', 'bold')
    pdf.setFontSize(11)
    pdf.setTextColor(...ink)
    pdf.text(`${question.score}/10`, marginX + contentWidth - 5, cy + 7.8, { align: 'right' })
    cy += headerRowH

    hr(cy, line, 0.3)
    cy += 6
    pdf.setTextColor(...ink)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(10)
    pdf.text(questionLines, marginX + 5, cy)
    cy += questionLines.length * 5 + 4

    hr(cy - 2, lineFaint, 0.2)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8.3)
    pdf.setTextColor(...inkMuted)
    pdf.text(
      `Communication: ${question.communication}/10     Confidence: ${question.confidence}/10     Correctness: ${question.correctness}/10`,
      marginX + 5, cy + 4
    )
    cy += subScoreRowH

    hr(cy - 2, lineFaint, 0.2)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(8.3)
    pdf.setTextColor(...ink)
    pdf.text('ANSWER', marginX + 5, cy + 3)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(...inkMuted)
    pdf.setFontSize(9)
    pdf.text(answerLines, marginX + 5, cy + 8)
    cy += answerRowH

    hr(cy - 2, lineFaint, 0.2)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(8.3)
    pdf.setTextColor(...ink)
    pdf.text('AI FEEDBACK', marginX + 5, cy + 3)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(...inkMuted)
    pdf.setFontSize(9)
    pdf.text(feedbackLines, marginX + 5, cy + 8)

    y = top + totalH + 8
  })

  // ============ FOOTER (content pages only, numbered relative to content) ============
  const totalPages = pdf.internal.getNumberOfPages()
  for (let i = contentStartPage; i <= totalPages; i++) {
    pdf.setPage(i)
    hr(pageHeight - 16, lineFaint, 0.2)
    pdf.setFontSize(7.5)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(...inkFaint)
    pdf.text('Confidential — Generated by InterviewIQ.AI', marginX, pageHeight - 10)
    pdf.text(`Page ${i - contentStartPage + 1} of ${totalPages - contentStartPage + 1}`, pageWidth - marginX, pageHeight - 10, { align: 'right' })
  }

  const fileName = `Interview_Report_${report.role || 'Unknown'}_${new Date().toISOString().split('T')[0]}.pdf`
  pdf.save(fileName)

  setExpandedQuestion(previousExpanded)
  setIsDownloading(false)
}

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 flex flex-col'>
      <Navbar />

      <div className="flex-1 px-4 sm:px-6 py-8 md:py-12">
        <div className='max-w-6xl mx-auto'>
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/history')}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-6 group"
          >
            <BsArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to History</span>
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Interview{' '}
                  <span className='bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
                    Report
                  </span>
                </h1>
                <p className='text-gray-500 text-lg'>Detailed analysis of your interview performance</p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadPDF}
                disabled={isDownloading}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-2xl font-medium hover:shadow-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <BsFilePdf size={20} />
                    <span>Download Report</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Score Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: <BsTrophy size={24} />,
                  label: 'Final Score',
                  value: `${report.finalScore}/10`,
                  gradient: 'from-purple-500 to-indigo-500',
                  iconBg: 'bg-purple-100',
                  iconColor: 'text-purple-600'
                },
                {
                  icon: <BsChatDots size={24} />,
                  label: 'Communication',
                  value: `${report.communication}/10`,
                  gradient: 'from-blue-500 to-cyan-500',
                  iconBg: 'bg-blue-100',
                  iconColor: 'text-blue-600'
                },
                {
                  icon: <FaUserCheck size={24} />,
                  label: 'Confidence',
                  value: `${report.confidence}/10`,
                  gradient: 'from-emerald-500 to-green-500',
                  iconBg: 'bg-emerald-100',
                  iconColor: 'text-emerald-600'
                },
                {
                  icon: <BsCheckCircle size={24} />,
                  label: 'Correctness',
                  value: `${report.correctness}/10`,
                  gradient: 'from-amber-500 to-orange-500',
                  iconBg: 'bg-amber-100',
                  iconColor: 'text-amber-600'
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-purple-200 transition-all duration-300"
                >
                  <div className={`inline-flex p-3 rounded-xl ${stat.iconBg} mb-3`}>
                    <div className={stat.iconColor}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>

                  {/* Progress Bar */}
                  <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(parseFloat(stat.value) / 10) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Performance Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FaChartLine className="text-purple-600" />
              Performance Overview
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: 'Communication Skills', score: report.communication, icon: <FaComments />, color: 'blue' },
                { label: 'Confidence Level', score: report.confidence, icon: <FaBrain />, color: 'emerald' },
                { label: 'Technical Accuracy', score: report.correctness, icon: <BsLightbulb />, color: 'amber' },
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-br ${metric.color === 'blue' ? 'from-blue-50 to-cyan-50' : metric.color === 'emerald' ? 'from-emerald-50 to-green-50' : 'from-amber-50 to-orange-50'} rounded-2xl p-6 border ${metric.color === 'blue' ? 'border-blue-200' : metric.color === 'emerald' ? 'border-emerald-200' : 'border-amber-200'}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`text-2xl ${metric.color === 'blue' ? 'text-blue-600' : metric.color === 'emerald' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {metric.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800">{metric.label}</h3>
                  </div>

                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    {metric.score}
                    <span className="text-lg text-gray-500">/10</span>
                  </div>

                  {renderStars(metric.score)}

                  <div className="mt-4 h-2 bg-white rounded-full overflow-hidden border border-gray-200">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(metric.score / 10) * 100}%` }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className={`h-full bg-gradient-to-r ${metric.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                          metric.color === 'emerald' ? 'from-emerald-500 to-green-500' :
                            'from-amber-500 to-orange-500'
                        } rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Question Wise Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <BsBarChart className="text-purple-600" />
              Question-wise Analysis
            </h2>

            <div className="space-y-4">
              {report.questionWiseScore?.map((question, index) => (
                <motion.div
                  key={question._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${expandedQuestion === index
                      ? 'border-purple-300 shadow-lg'
                      : 'border-gray-100 hover:border-purple-200 shadow-sm'
                    }`}
                >
                  <div
                    onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                    className="p-6 cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-sm font-bold text-purple-600">
                            Q{index + 1}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-gray-500">
                            <BsClock size={14} />
                            {question.timeLimit}s
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          {question.question}
                        </h3>

                        <div className="flex items-center gap-4">
                          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${getScoreBg(question.score)}`}>
                            <span className="text-sm font-medium">Score:</span>
                            <span className={`text-lg font-bold ${getScoreColor(question.score)}`}>
                              {question.score}/10
                            </span>
                          </div>

                          <div className="hidden sm:flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <FaComments size={14} />
                              Comm: {question.communication}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaBrain size={14} />
                              Conf: {question.confidence}
                            </span>
                            <span className="flex items-center gap-1">
                              <BsCheckCircle size={14} />
                              Corr: {question.correctness}
                            </span>
                          </div>
                        </div>
                      </div>

                      <motion.div
                        animate={{ rotate: expandedQuestion === index ? 180 : 0 }}
                        className="text-gray-400 mt-2"
                      >
                        <BsChevronDown size={20} />
                      </motion.div>
                    </div>

                    {/* Score Bar */}
                    <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(question.score / 10) * 100}%` }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className={`h-full bg-gradient-to-r ${getScoreBarColor(question.score)} rounded-full`}
                      />
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedQuestion === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t-2 border-gray-100 p-6 bg-gray-50/50"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Your Answer */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <BsChatDots className="text-blue-600" />
                            Your Answer
                          </h4>
                          <div className="bg-white rounded-xl p-4 border border-gray-200">
                            <p className="text-gray-600 leading-relaxed">
                              {question.answer || "No answer provided"}
                            </p>
                          </div>
                        </div>

                        {/* Feedback */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <BsLightbulb className="text-amber-500" />
                            AI Feedback
                          </h4>
                          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                            <p className="text-gray-700 leading-relaxed">
                              {question.feedback}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Detailed Scores */}
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        {[
                          { label: 'Communication', value: question.communication, icon: <FaComments />, color: 'blue' },
                          { label: 'Confidence', value: question.confidence, icon: <FaBrain />, color: 'emerald' },
                          { label: 'Correctness', value: question.correctness, icon: <BsCheckCircle />, color: 'amber' },
                        ].map((detail, idx) => (
                          <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                            <div className={`inline-flex p-2 rounded-lg ${detail.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                detail.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                  'bg-amber-50 text-amber-600'
                              } mb-2`}>
                              {detail.icon}
                            </div>
                            <div className="text-lg font-bold text-gray-800">{detail.value}/10</div>
                            <div className="text-xs text-gray-500">{detail.label}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 mt-8 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/interview')}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-purple-500/30 hover:shadow-2xl transition-all duration-300"
            >
              Practice Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/history')}
              className="flex-1 bg-white text-gray-800 py-4 rounded-2xl font-semibold text-lg border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 shadow-lg"
            >
              View All Interviews
            </motion.button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Step3Report