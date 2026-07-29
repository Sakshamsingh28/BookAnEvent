import React from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
  showScannerOverlay?: boolean;
}

export const QRCodePlaceholder: React.FC<QRCodeProps> = ({ value, size = 180, showScannerOverlay = false }) => {
  // Generate deterministic grid pattern based on string hash for authentic QR code look
  const hash = value.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  const gridSize = 21; // Standard QR Version 1 grid size
  
  const cells: boolean[][] = [];
  for (let r = 0; r < gridSize; r++) {
    const row: boolean[] = [];
    for (let c = 0; c < gridSize; c++) {
      // Position Detection Patterns (Top-Left, Top-Right, Bottom-Left 7x7 squares)
      const isTopLeft = r < 7 && c < 7;
      const isTopRight = r < 7 && c >= gridSize - 7;
      const isBottomLeft = r >= gridSize - 7 && c < 7;
      
      if (isTopLeft || isTopRight || isBottomLeft) {
        // Render standard finder pattern
        const localR = isTopLeft ? r : isTopRight ? r : r - (gridSize - 7);
        const localC = isTopLeft ? c : isTopRight ? c - (gridSize - 7) : c;
        const isBorder = localR === 0 || localR === 6 || localC === 0 || localC === 6;
        const isCenter = localR >= 2 && localR <= 4 && localC >= 2 && localC <= 4;
        row.push(isBorder || isCenter);
      } else if (r === 10 && c === 10) {
        // Center space reserved for logo icon
        row.push(false);
      } else {
        // Pseudo-random data cell fill based on hash and cell coordinates
        const isFilled = ((r * 13 + c * 37 + hash * 7) % 100) > 42;
        row.push(isFilled);
      }
    }
    cells.push(row);
  }

  const cellSize = size / gridSize;

  return (
    <div className="relative flex flex-col items-center justify-center bg-white p-4 rounded-2xl border border-[#EAEAEA] shadow-inner">
      <div style={{ width: size, height: size }} className="relative bg-white flex items-center justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {cells.map((row, r) =>
            row.map((isFilled, c) => {
              if (!isFilled) return null;
              // Skip center square for logo overlay
              if (r >= 8 && r <= 12 && c >= 8 && c <= 12) return null;
              return (
                <rect
                  key={`${r}-${c}`}
                  x={c * cellSize}
                  y={r * cellSize}
                  width={cellSize - 0.2}
                  height={cellSize - 0.2}
                  rx={0.8}
                  fill="#1D1D1F"
                />
              );
            })
          )}
        </svg>

        {/* Center Logo Placeholder Badge */}
        <div className="absolute w-10 h-10 bg-white rounded-xl shadow-md border border-gray-200 flex items-center justify-center p-1">
          <div className="w-full h-full bg-[#1D1D1F] rounded-lg text-white font-heading font-bold text-xs flex items-center justify-center">
            DSG
          </div>
        </div>

        {/* Optional Scanning Line Effect */}
        {showScannerOverlay && (
          <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-scan shadow-glow" />
          </div>
        )}
      </div>

      <div className="mt-2 text-center">
        <p className="font-num text-[10px] text-[#6E6E73] font-medium tracking-wider uppercase">
          Digital QR Code
        </p>
      </div>
    </div>
  );
};
