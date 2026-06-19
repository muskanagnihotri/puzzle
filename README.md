Slider Effort Task — Replica

Files:
- index.html
- styles.css
- app.js

How to run:
Open `index.html` in your browser, or run a simple HTTP server:

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000/index.html
```

Behavior:
- 48 sliders arranged in 3 columns.
- Each slider ranges 0..100 (integers). Current value shown to the right.
- Points score counts how many sliders are *exactly* at 50.
- Countdown timer disables sliders when it reaches 0.

Adjustments you can make:
- Change `TOTAL_SLIDERS` or `DURATION` in `app.js`.

