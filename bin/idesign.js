#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const args = process.argv.slice(2)
const command = args[0]

const helpText = `
Idesign CLI — Apple Liquid Glass Vue 3 Component Library

Usage:
  npx idesign init                 Initialize Idesign tokens and styles in your project
  npx idesign add <component...>   Add one or more components to your src/components/idesign directory
  npx idesign list                 List all available components

Examples:
  npx idesign init
  npx idesign add button modal navbar
`

if (!command || command === '--help' || command === '-h') {
  console.log(helpText)
  process.exit(0)
}

if (command === 'list') {
  const componentsDir = path.join(rootDir, 'src', 'components', 'idesign')
  if (fs.existsSync(componentsDir)) {
    const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.vue'))
    console.log('\n📦 Available Idesign Components:\n')
    files.forEach(f => {
      const name = f.replace('.vue', '')
      console.log(`  - ${name}`)
    })
    console.log(`\nTotal: ${files.length} components\n`)
  } else {
    console.error('Components directory not found.')
  }
  process.exit(0)
}

if (command === 'init') {
  console.log('\n🚀 Initializing Idesign in current directory...\n')
  const targetStylesDir = path.join(process.cwd(), 'src', 'styles')
  const targetCompDir = path.join(process.cwd(), 'src', 'components', 'idesign')

  fs.mkdirSync(targetStylesDir, { recursive: true })
  fs.mkdirSync(targetCompDir, { recursive: true })

  const srcTokens = path.join(rootDir, 'src', 'styles', 'tokens.css')
  const destTokens = path.join(targetStylesDir, 'tokens.css')

  if (fs.existsSync(srcTokens)) {
    fs.copyFileSync(srcTokens, destTokens)
    console.log(`  ✓ Copied tokens.css → src/styles/tokens.css`)
  }

  console.log('\n✨ Initialized successfully! Import tokens.css in your main.js or App.vue:\n')
  console.log("  import './styles/tokens.css'\n")
  process.exit(0)
}

if (command === 'add') {
  const compNames = args.slice(1)
  if (compNames.length === 0) {
    console.error('Please specify at least one component to add. Example: npx idesign add button modal')
    process.exit(1)
  }

  const sourceCompDir = path.join(rootDir, 'src', 'components', 'idesign')
  const targetCompDir = path.join(process.cwd(), 'src', 'components', 'idesign')
  fs.mkdirSync(targetCompDir, { recursive: true })

  const availableFiles = fs.readdirSync(sourceCompDir)

  compNames.forEach(rawName => {
    const searchName = rawName.toLowerCase()
    const matched = availableFiles.find(f => f.toLowerCase() === `id${searchName}.vue` || f.toLowerCase() === `${searchName}.vue`)

    if (matched) {
      const srcFile = path.join(sourceCompDir, matched)
      const destFile = path.join(targetCompDir, matched)
      fs.copyFileSync(srcFile, destFile)
      console.log(`  ✓ Added ${matched} → src/components/idesign/${matched}`)
    } else {
      console.warn(`  ⚠ Component "${rawName}" not found. Run "npx idesign list" to see all components.`)
    }
  })

  console.log('\nDone!\n')
  process.exit(0)
}

console.error(`Unknown command "${command}". Run "npx idesign --help" for usage.`)
process.exit(1)
