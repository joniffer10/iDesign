#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

// ANSI Color formatting helpers
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m'
}

const printBanner = () => {
  console.log(`
${c.blue}${c.bold}  ⚡ IDESIGN${c.reset} ${c.dim}— Liquid Glass UI Component Library${c.reset}
`)
}

// Framework Detector
const detectFramework = () => {
  const cwd = process.cwd()
  const hasNuxtConfig = fs.existsSync(path.join(cwd, 'nuxt.config.ts')) || fs.existsSync(path.join(cwd, 'nuxt.config.js'))
  const hasSrc = fs.existsSync(path.join(cwd, 'src'))

  if (hasNuxtConfig) {
    return {
      type: 'nuxt',
      name: 'Nuxt 3',
      compDir: path.join(cwd, hasSrc ? 'src/components/idesign' : 'components/idesign'),
      templateDir: path.join(cwd, hasSrc ? 'src/pages' : 'pages'),
      stylesDir: path.join(cwd, hasSrc ? 'src/styles' : 'assets/styles')
    }
  }

  return {
    type: 'vue',
    name: 'Vue 3 / Vite',
    compDir: path.join(cwd, hasSrc ? 'src/components/idesign' : 'components/idesign'),
    templateDir: path.join(cwd, hasSrc ? 'src/components/templates' : 'components/templates'),
    stylesDir: path.join(cwd, hasSrc ? 'src/styles' : 'styles')
  }
}

// Compound Bundles Alias Mapping
const compoundBundles = {
  form: ['IdForm', 'IdFormField', 'IdFormLabel', 'IdFormDescription', 'IdFormMessage', 'IdFormGroup', 'IdFormSection', 'IdFormActions'],
  card: ['IdCard', 'IdCardHeader', 'IdCardTitle', 'IdCardDescription', 'IdCardContent', 'IdCardFooter'],
  dialog: ['IdDialog', 'IdDialogHeader', 'IdDialogTitle', 'IdDialogDescription', 'IdDialogBody', 'IdDialogFooter'],
  frames: ['IdMacbookFrame', 'IdIpadFrame', 'IdIphoneFrame', 'IdImageFrame'],
  charts: ['IdBarChart', 'IdPieChart', 'IdDonutChart', 'IdSparkline']
}

// Page Templates Mapping
const templateMap = {
  settings: 'SettingsTemplate.vue',
  analytics: 'AnalyticsTemplate.vue',
  checkout: 'CheckoutTemplate.vue',
  hero: 'HeroTemplate.vue',
  product: 'ProductShowcaseTemplate.vue',
  'ai-chat': 'AiChatTemplate.vue',
  dashboard: 'DashboardTemplate.vue',
  auth: 'AuthTemplate.vue'
}

const args = process.argv.slice(2)
const command = args[0]

const helpText = `
${c.bold}Usage:${c.reset}
  ${c.cyan}npx idesign init${c.reset}                    Initialize tokens and configuration in your project
  ${c.cyan}npx idesign add <components...>${c.reset}    Add one or more components or compound bundles
  ${c.cyan}npx idesign template <name>${c.reset}        Scaffold a complete Liquid Glass page template
  ${c.cyan}npx idesign list${c.reset}                    List all 70+ available components & templates
  ${c.cyan}npx idesign status${c.reset}                  Inspect installed components in your project

${c.bold}Compound System Bundles:${c.reset}
  ${c.yellow}form${c.reset}    → IdForm, IdFormField, IdFormLabel, IdFormGroup, IdFormActions, etc.
  ${c.yellow}card${c.reset}    → IdCard, IdCardHeader, IdCardTitle, IdCardContent, IdCardFooter
  ${c.yellow}dialog${c.reset}  → IdDialog, IdDialogHeader, IdDialogTitle, IdDialogBody, IdDialogFooter
  ${c.yellow}frames${c.reset}  → IdMacbookFrame, IdIpadFrame, IdIphoneFrame, IdImageFrame

${c.bold}Examples:${c.reset}
  npx idesign init
  npx idesign add button input toggle pin-input
  npx idesign add form card dialog
  npx idesign template settings
  npx idesign template analytics
`

if (!command || command === '--help' || command === '-h') {
  printBanner()
  console.log(helpText)
  process.exit(0)
}

// ─── COMMAND: LIST ───
if (command === 'list') {
  printBanner()
  const componentsDir = path.join(rootDir, 'src', 'components', 'idesign')
  const templatesDir = path.join(rootDir, 'src', 'components', 'templates')

  if (fs.existsSync(componentsDir)) {
    const compFiles = fs.readdirSync(componentsDir).filter(f => f.endsWith('.vue'))
    const templateFiles = fs.existsSync(templatesDir) ? fs.readdirSync(templatesDir).filter(f => f.endsWith('.vue')) : []

    console.log(`${c.bold}📦 Available UI Components (${compFiles.length}):${c.reset}\n`)
    
    // Categorize
    const cols = 3
    let row = ''
    compFiles.forEach((f, i) => {
      const name = f.replace('.vue', '')
      const padded = name.padEnd(26)
      row += `  ${c.cyan}${padded}${c.reset}`
      if ((i + 1) % cols === 0 || i === compFiles.length - 1) {
        console.log(row)
        row = ''
      }
    })

    console.log(`\n${c.bold}📑 Page Templates (${templateFiles.length}):${c.reset}\n`)
    templateFiles.forEach(t => {
      const alias = Object.keys(templateMap).find(k => templateMap[k] === t) || t.replace('.vue', '')
      console.log(`  ${c.green}✦ ${alias.padEnd(16)}${c.reset} ${c.dim}(${t})${c.reset}`)
    })

    console.log(`\n${c.dim}Run "npx idesign add <component>" or "npx idesign template <name>" to scaffold.${c.reset}\n`)
  }
  process.exit(0)
}

// ─── COMMAND: INIT ───
if (command === 'init') {
  printBanner()
  const fw = detectFramework()
  console.log(`🚀 Initializing Idesign for ${c.bold}${fw.name}${c.reset}...\n`)

  fs.mkdirSync(fw.stylesDir, { recursive: true })
  fs.mkdirSync(fw.compDir, { recursive: true })

  // 1. Copy tokens.css
  const srcTokens = path.join(rootDir, 'src', 'styles', 'tokens.css')
  const destTokens = path.join(fw.stylesDir, 'tokens.css')
  if (fs.existsSync(srcTokens)) {
    fs.copyFileSync(srcTokens, destTokens)
    console.log(`  ${c.green}✓${c.reset} Created design tokens → ${c.cyan}${path.relative(process.cwd(), destTokens)}${c.reset}`)
  }

  // 2. Copy useIdesignConfig.js composable
  const targetComposablesDir = path.join(process.cwd(), fw.type === 'nuxt' ? 'composables' : 'src/composables')
  fs.mkdirSync(targetComposablesDir, { recursive: true })
  const srcConfig = path.join(rootDir, 'src', 'composables', 'useIdesignConfig.js')
  const destConfig = path.join(targetComposablesDir, 'useIdesignConfig.js')
  if (fs.existsSync(srcConfig)) {
    fs.copyFileSync(srcConfig, destConfig)
    console.log(`  ${c.green}✓${c.reset} Created config composable → ${c.cyan}${path.relative(process.cwd(), destConfig)}${c.reset}`)
  }

  console.log(`\n${c.bold}✨ Idesign initialized successfully!${c.reset}\n`)
  if (fw.type === 'nuxt') {
    console.log(`Add tokens to ${c.cyan}nuxt.config.ts${c.reset}:`)
    console.log(`${c.dim}  export default defineNuxtConfig({`)
    console.log(`    css: ['~/${path.relative(process.cwd(), destTokens).replace(/\\\\/g, '/')}']`)
    console.log(`  })${c.reset}\n`)
  } else {
    console.log(`Import tokens in ${c.cyan}src/main.js${c.reset} or ${c.cyan}src/App.vue${c.reset}:`)
    console.log(`${c.dim}  import './styles/tokens.css'${c.reset}\n`)
  }
  process.exit(0)
}

// ─── COMMAND: TEMPLATE ───
if (command === 'template') {
  printBanner()
  const templateName = args[1]?.toLowerCase()
  if (!templateName || !templateMap[templateName]) {
    console.error(`${c.red}Error:${c.reset} Please specify a valid template name. Available templates:\n`)
    Object.keys(templateMap).forEach(k => {
      console.log(`  - ${c.cyan}${k}${c.reset}`)
    })
    console.log(`\nExample: ${c.dim}npx idesign template settings${c.reset}\n`)
    process.exit(1)
  }

  const fw = detectFramework()
  fs.mkdirSync(fw.templateDir, { recursive: true })

  const templateFileName = templateMap[templateName]
  const srcTemplate = path.join(rootDir, 'src', 'components', 'templates', templateFileName)
  const destTemplate = path.join(fw.templateDir, templateFileName)

  if (fs.existsSync(srcTemplate)) {
    fs.copyFileSync(srcTemplate, destTemplate)
    console.log(`  ${c.green}✓${c.reset} Scaffolding template: ${c.bold}${templateName}${c.reset}`)
    console.log(`    → Created ${c.cyan}${path.relative(process.cwd(), destTemplate)}${c.reset}`)
  } else {
    console.error(`${c.red}Template file ${templateFileName} not found in source.${c.reset}`)
    process.exit(1)
  }

  console.log(`\n${c.green}${c.bold}Done!${c.reset} You can now import and use ${c.bold}${templateFileName.replace('.vue', '')}${c.reset} in your application.\n`)
  process.exit(0)
}

// ─── COMMAND: ADD ───
if (command === 'add') {
  printBanner()
  const rawRequests = args.slice(1)
  if (rawRequests.length === 0) {
    console.error(`${c.red}Error:${c.reset} Please specify at least one component to add.`)
    console.log(`\nExamples:`)
    console.log(`  npx idesign add button toggle input`)
    console.log(`  npx idesign add form card dialog`)
    console.log(`  npx idesign add macbook-frame kbd\n`)
    process.exit(1)
  }

  const fw = detectFramework()
  fs.mkdirSync(fw.compDir, { recursive: true })

  const sourceCompDir = path.join(rootDir, 'src', 'components', 'idesign')
  const availableFiles = fs.readdirSync(sourceCompDir)

  // Expand compound bundles if requested
  const resolvedTargets = new Set()
  rawRequests.forEach(req => {
    const lower = req.toLowerCase()
    if (compoundBundles[lower]) {
      compoundBundles[lower].forEach(cName => resolvedTargets.add(cName))
    } else {
      resolvedTargets.add(req)
    }
  })

  console.log(`Adding ${c.bold}${resolvedTargets.size}${c.reset} component(s) to ${c.cyan}${path.relative(process.cwd(), fw.compDir)}${c.reset}...\n`)

  let successCount = 0
  resolvedTargets.forEach(targetName => {
    const search = targetName.toLowerCase().replace(/^id/, '').replace(/-/g, '')
    const matched = availableFiles.find(f => {
      const base = f.replace('.vue', '').toLowerCase().replace(/^id/, '').replace(/-/g, '')
      return base === search || f.toLowerCase() === `${targetName.toLowerCase()}.vue`
    })

    if (matched) {
      const srcFile = path.join(sourceCompDir, matched)
      const destFile = path.join(fw.compDir, matched)
      fs.copyFileSync(srcFile, destFile)
      console.log(`  ${c.green}✓${c.reset} Added ${c.bold}${matched}${c.reset}`)
      successCount++
    } else {
      console.warn(`  ${c.yellow}⚠${c.reset} Component "${targetName}" not found. Run "${c.cyan}npx idesign list${c.reset}" to view all components.`)
    }
  })

  console.log(`\n${c.green}${c.bold}Successfully added ${successCount} component(s)!${c.reset}\n`)
  process.exit(0)
}

// ─── COMMAND: STATUS ───
if (command === 'status') {
  printBanner()
  const fw = detectFramework()
  console.log(`Inspecting project in ${c.cyan}${process.cwd()}${c.reset} (${fw.name})...\n`)

  if (fs.existsSync(fw.compDir)) {
    const installed = fs.readdirSync(fw.compDir).filter(f => f.endsWith('.vue'))
    console.log(`${c.bold}Installed Components (${installed.length}):${c.reset}`)
    installed.forEach(f => console.log(`  ${c.green}✓${c.reset} ${f.replace('.vue', '')}`))
    console.log()
  } else {
    console.log(`${c.yellow}No components found in ${path.relative(process.cwd(), fw.compDir)}.${c.reset}`)
    console.log(`Run "${c.cyan}npx idesign init${c.reset}" and "${c.cyan}npx idesign add <component>${c.reset}" to begin.\n`)
  }
  process.exit(0)
}

console.error(`${c.red}Unknown command "${command}".${c.reset} Run "${c.cyan}npx idesign --help${c.reset}" for usage.`)
process.exit(1)
