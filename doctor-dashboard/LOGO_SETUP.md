# 🎨 Logo Setup Instructions

## Step 1: Save Your Logo

1. **Right-click** on the logo image you uploaded in the chat
2. **Save the image** as `clinix-logo.png`
3. **Place it** in this folder:
   ```
   doctor-dashboard/src/assets/clinix-logo.png
   ```

## Step 2: Verify the Path

Make sure your logo is saved at:
```
C:\Users\HARSH\Documents\Clinix Sphere\doctor-dashboard\src\assets\clinix-logo.png
```

## Step 3: Restart Dev Server (if needed)

If the logo doesn't appear:
1. Stop the dev server (Ctrl+C in terminal)
2. Run `npm run dev` again

## ✅ Where the Logo Appears

Your logo will automatically show up in:
- ✅ **Sidebar** - Main navigation logo
- ✅ **Login Page** - Desktop & mobile versions
- ✅ **Signup Page** - Left panel branding

## 📐 Logo Specifications

The logo image should be:
- **Format**: PNG (with transparent background recommended)
- **Size**: Minimum 200x200px for best quality
- **Aspect Ratio**: Square or wide (as in your provided image)

## 🎨 Current Logo Sizes

- **Sidebar**: 40px height (auto width)
- **Login Desktop**: 64px height
- **Login Mobile**: 48px height
- **Signup**: 56px height

## 🔧 Troubleshooting

If the logo doesn't show:

1. **Check file name**: Must be exactly `clinix-logo.png`
2. **Check location**: Must be in `src/assets/` folder
3. **Clear cache**: Hard refresh browser (Ctrl+Shift+R)
4. **Restart server**: Stop and start `npm run dev`

## 🌟 Customization

To change logo sizes, edit the `className` in these files:
- `src/components/Sidebar.jsx` - Line 64
- `src/pages/Login.jsx` - Lines 61, 127
- `src/pages/Signup.jsx` - Line 79

Example:
```jsx
className="h-10 w-auto"  // Change h-10 to h-12, h-16, etc.
```
