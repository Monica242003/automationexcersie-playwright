/**
 * Visual Cursor Tracker Script.
 * This is injected into the browser page context to draw a visible cursor
 * and display real-time coordinates.
 */
export const cursorTrackerScript = `
(() => {
  if (window.__playwright_cursor_tracker_active) return;
  window.__playwright_cursor_tracker_active = true;

  const initTracker = () => {
    // Create elements
    const pointer = document.createElement('playwright-cursor');
    const label = document.createElement('playwright-cursor-label');
    
    // Inject styles
    const styles = document.createElement('style');
    styles.innerHTML = \`
      playwright-cursor {
        pointer-events: none !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 24px !important;
        height: 24px !important;
        background: rgba(255, 0, 0, 0.4) !important;
        border: 2px solid #ff0000 !important;
        border-radius: 50% !important;
        margin: -12px 0 0 -12px !important;
        z-index: 100000000 !important;
        transition: background-color 0.1s, transform 0.1s !important;
      }
      playwright-cursor.click {
        background: rgba(0, 0, 255, 0.6) !important;
        border-color: #0000ff !important;
        transform: scale(0.8) !important;
      }
      playwright-cursor-label {
        pointer-events: none !important;
        position: absolute !important;
        background: rgba(0, 0, 0, 0.85) !important;
        color: #ffffff !important;
        padding: 2px 6px !important;
        border-radius: 4px !important;
        font-family: 'Consolas', 'Courier New', monospace !important;
        font-size: 10px !important;
        font-weight: bold !important;
        white-space: nowrap !important;
        z-index: 100000001 !important;
        margin-left: 15px !important;
        margin-top: 15px !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3) !important;
      }
    \`;
    document.head.appendChild(styles);
    document.body.appendChild(pointer);
    document.body.appendChild(label);

    const updatePointer = (x, y) => {
      pointer.style.left = x + 'px';
      pointer.style.top = y + 'px';
      label.style.left = x + 'px';
      label.style.top = y + 'px';
      label.innerText = \`X: \${x}, Y: \${y}\`;
    };

    document.addEventListener('mousemove', (e) => {
      updatePointer(e.pageX, e.pageY);
    }, { passive: true, capture: true });

    document.addEventListener('mousedown', (e) => {
      pointer.classList.add('click');
      updatePointer(e.pageX, e.pageY);
    }, { passive: true, capture: true });

    document.addEventListener('mouseup', (e) => {
      pointer.classList.remove('click');
      updatePointer(e.pageX, e.pageY);
    }, { passive: true, capture: true });
  };

  if (document.body) {
    initTracker();
  } else {
    document.addEventListener('DOMContentLoaded', initTracker);
  }
})();
`;
