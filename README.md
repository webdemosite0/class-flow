# ClassFlow

A polished Next.js prototype for a modern online classroom platform.

## Included screens
- Landing page
- Login / sign up
- Teacher dashboard
- Classes
- Create class
- Student join flow
- Live classroom UI
- Screen sharing modal
- Whiteboard
- Assignments
- Students
- Recordings
- Settings
- Schedule / Resources placeholders

## Recommended production APIs

### Live classroom
Use **LiveKit Cloud** for WebRTC video, audio, screen sharing, participant permissions and recordings.

Required environment variables later:
```
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=
```

### Database
Use **Neon Postgres** for users, classes, attendance, assignments and recordings metadata.

```
DATABASE_URL=
```

### Authentication
Use **Clerk** or **Better Auth**. Better Auth is ideal if you want to keep auth inside your own database.

## Local development
```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Current state
The repository is intentionally deployable with no secrets so the product UI can be reviewed first. LiveKit, Neon and authentication should be connected in the next implementation phase.
