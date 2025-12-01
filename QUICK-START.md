# Quick Start Guide

Get the Omaha Tree Care diagnostic tools running on your local machine in 5 minutes.

## Prerequisites

You need Node.js installed on your computer.

**Check if you have Node.js:**
```bash
node --version
```

If you see a version number (like `v18.17.0` or higher), you're good!

**Don't have Node.js?**
1. Download from https://nodejs.org
2. Install the **LTS version** (recommended)
3. Restart your terminal/command prompt

## Step 1: Open Terminal in Project Folder

**Mac:**
1. Open Terminal app (Applications/Utilities/Terminal)
2. Type: `cd ` (with a space after cd)
3. Drag the `winter-defense` folder into Terminal
4. Press Enter

**Windows:**
1. Open the `winter-defense` folder in File Explorer
2. Click in the address bar at the top
3. Type `cmd` and press Enter

**Linux:**
```bash
cd /path/to/winter-defense
```

## Step 2: Install Dependencies

```bash
npm install
```

This takes 2-3 minutes. You'll see progress messages as packages are downloaded.

**What this does:**
- Downloads React, Vite, Tailwind CSS, and all other dependencies
- Sets up the development environment
- Prepares the build tools

## Step 3: Start Development Server

```bash
npm run dev
```

You'll see output like:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**What this does:**
- Starts the vite-react-ssg development server
- Enables hot module replacement (instant updates when you save files)
- Makes the site available at http://localhost:5173

## Step 4: View the Site

1. Open your web browser
2. Go to: **http://localhost:5173**
3. You should see the Omaha Tree Care homepage!

**Navigate to tools:**
- Click "Try Our Free Tools" button
- Or go to: **http://localhost:5173/tools**

## Step 5: Make Changes

1. Open the project in a code editor (VS Code recommended)
2. Edit any file in `src/`
3. Save the file
4. Your browser **automatically refreshes** with the changes!

**Try it:**
- Open `src/pages/HomePage.jsx`
- Change some text
- Save the file
- Watch the browser update instantly

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## What's Next?

Now that you have the site running:

1. **Explore the tools** - Try all 5 diagnostic tools at `/tools`
2. **Read the docs:**
   - `README.md` - Full documentation
   - `PROJECT-STRUCTURE.md` - Understand the file structure
   - `DEPLOYMENT-CHECKLIST.md` - How to deploy
3. **Make changes** - Edit content, update phone numbers, customize

## Common Issues & Solutions

### Issue: "npm: command not found"

**Solution:** Install Node.js from https://nodejs.org, then restart your terminal.

### Issue: "Port 5173 already in use"

**Solution:**
```bash
# Kill the existing process
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Issue: "Module not found" errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Code changes not showing

**Solution:**
- Make sure you saved the file (Ctrl+S / Cmd+S)
- Check the terminal for errors
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- Restart dev server: Ctrl+C, then `npm run dev`

### Issue: Build errors after updates

**Solution:**
```bash
# Clean build
rm -rf dist
npm run build
```

## Development Workflow

1. **Start dev server:** `npm run dev`
2. **Make changes:** Edit files in `src/`
3. **Save files:** Changes appear instantly in browser
4. **Test changes:** Verify everything works
5. **Build for production:** `npm run build`
6. **Deploy:** Push to Vercel or your hosting platform

## File Editing Tips

**VS Code Extensions (recommended):**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- Auto Rename Tag

**Key files you'll edit:**
- `src/pages/HomePage.jsx` - Landing page content
- `src/pages/ToolsPage.jsx` - Tools page wrapper
- `src/components/tool/TreeDiagnostic.jsx` - Main diagnostic tool
- `src/index.css` - Global styles

## Testing Your Changes

### Browser DevTools
Press F12 or right-click → Inspect to:
- Check console for errors (Console tab)
- Test mobile views (Device toolbar)
- Inspect elements (Elements tab)
- Monitor network requests (Network tab)

### Mobile Testing
In Chrome DevTools:
1. Click the device icon (toggle device toolbar)
2. Select iPhone or Android device
3. Test touch interactions and responsiveness

## Ready to Deploy?

Once you've made your changes and tested everything:

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Test the production build:**
   ```bash
   npm run preview
   ```

3. **Deploy to Vercel:**
   ```bash
   npm install -g vercel
   vercel
   ```

See `DEPLOYMENT-CHECKLIST.md` for detailed deployment instructions.

## Getting Help

**Documentation files:**
- `README.md` - Technical overview
- `PROJECT-STRUCTURE.md` - File organization
- `DEPLOYMENT-CHECKLIST.md` - Going live
- `EMAILJS-SETUP.md` - Contact form setup

**Resources:**
- Vite Docs: https://vitejs.dev
- React Docs: https://react.dev
- Tailwind Docs: https://tailwindcss.com
- vite-react-ssg: https://github.com/antfu/vite-ssg

**Still stuck?**
- Check the browser console (F12) for error messages
- Search the error on Google or Stack Overflow
- Ask AI assistants (Claude, ChatGPT) with the error message

## Next Steps

✅ Site running locally
→ Read `PROJECT-STRUCTURE.md` to understand the codebase
→ Explore the 5 diagnostic tools
→ Make customizations
→ Follow `DEPLOYMENT-CHECKLIST.md` to go live

You've got this! 🌲
