
# 📝 Blog Post App

A **modern mobile blogging app** built with **React Native**, **Convex**, and **Expo**.
Users can create, view, and interact with blog posts in a sleek and intuitive UI.

---

## 🚀 Features

* ✍️ **Create & Edit Posts** – Write blog posts with text and optional images
* 🖼️ **Image Uploads** – Add media to your posts seamlessly
* ❤️ **Like & Comment System** – Engage with content
* 🔍 **Search Functionality** – Find users or posts instantly
* 👤 **User Profiles** – View and manage your profile details
* 🕒 **Live Updates** – Real-time sync powered by Convex
* 🌗 **Dark & Light Mode** – Automatic theme switching

---

## 🧱 Tech Stack

| Category             | Technologies Used                         |
| -------------------- | ----------------------------------------- |
| **Frontend**         | React Native (Expo)                       |
| **Backend**          | Convex (serverless database + API)        |
| **Auth**             | Clerk / Auth0 *(depending on your setup)* |
| **State Management** | React Hooks                               |
| **UI**               | React Native  Custom Components    |
| **Language**         | TypeScript                                |

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Douglasemmanuel/HNG-13-STAGE-4-FRONTEND-TRACK.git
cd framez
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
CONVEX_DEPLOYMENT=<your-convex-deployment-url>
CLERK_PUBLISHABLE_KEY=<your-clerk-key>
```

### 4. Run the development server

```bash
npx expo start
```

Scan the QR code in your Expo Go app to preview it on your device 📱

---




## 🧠 Folder Structure

```
📂 blog-post-app
 ┣ 📂 app
 ┃ ┣ 📂 (tabs)
 ┃ ┃ ┣ create.tsx
 ┃ ┃ ┣ home.tsx
 ┃ ┃ ┗ profile.tsx
 | | |_ search.tsx
 ┣ 📂 components
 ┣ 📂 modules
 ┣ 📂 constants
 ┣ 📂 convex
 ┣ 📄 app.json
 ┣ 📄 package.json
 ┗ 📄 README.md
```

---

## 🌍 API Overview (Convex)

Example mutation to add a thread:

```ts
export const addThread = mutation({
  args: {
    content: v.optional(v.string()),
    mediaFiles: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    return await ctx.db.insert('messages', {
      ...args,
      userId: user._id,
      likeCount: 0,
      commentCount: 0,
    });
  },
});
```

---



## 🪪 License

This project is licensed under the **MIT License** – feel free to use and modify it.

---
