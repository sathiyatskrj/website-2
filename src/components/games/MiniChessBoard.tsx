"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Playable mini chess-style board.
 * Inspired by jhuckaby/Effect-Games (game loop pattern) and kunjgit/GameZone (browser mini-games).
 * 
 * This is a visual, interactive "chess puzzle" widget for the website sidebar/gallery page.
 * Features:
 *  - HTML5 Canvas rendered chessboard
 *  - Click to select/move pieces (basic rules: any piece moves to any empty square — showcase only)
 *  - Animated highlights using requestAnimationFrame game loop
 *  - Piece captures with pulse animation
 */

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

type PieceColor = "w" | "b";
type PieceType = "K" | "Q" | "R" | "B" | "N" | "P";

interface Piece {
  type: PieceType;
  color: PieceColor;
}

type Board = (Piece | null)[][];

const PIECE_UNICODE: Record<PieceType, Record<PieceColor, string>> = {
  K: { w: "♔", b: "♚" },
  Q: { w: "♕", b: "♛" },
  R: { w: "♖", b: "♜" },
  B: { w: "♗", b: "♝" },
  N: { w: "♘", b: "♞" },
  P: { w: "♙", b: "♟" },
};

function makeInitialBoard(): Board {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));
  const backRank: PieceType[] = ["R", "N", "B", "Q", "K", "B", "N", "R"];

  for (let c = 0; c < 8; c++) {
    board[0][c] = { type: backRank[c], color: "b" };
    board[1][c] = { type: "P", color: "b" };
    board[6][c] = { type: "P", color: "w" };
    board[7][c] = { type: backRank[c], color: "w" };
  }

  return board;
}

interface MiniChessBoardProps {
  className?: string;
  width?: number;
}

export function MiniChessBoard({ className = "", width = 320 }: MiniChessBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [board, setBoard] = useState<Board>(makeInitialBoard);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [turn, setTurn] = useState<PieceColor>("w");
  const [lastMove, setLastMove] = useState<{ from: [number, number]; to: [number, number] } | null>(null);
  const [captureAnim, setCaptureAnim] = useState<{ row: number; col: number; progress: number } | null>(null);
  const animRef = useRef<number>(0);
  const captureRef = useRef(captureAnim);
  captureRef.current = captureAnim;

  const cellSize = width / 8;

  const drawBoard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const isLight = (r + c) % 2 === 0;
        const isSelected = selected && selected[0] === r && selected[1] === c;
        const isLastFrom = lastMove && lastMove.from[0] === r && lastMove.from[1] === c;
        const isLastTo = lastMove && lastMove.to[0] === r && lastMove.to[1] === c;

        // Cell color
        if (isSelected) {
          ctx.fillStyle = "#f6f669";
        } else if (isLastFrom || isLastTo) {
          ctx.fillStyle = isLight ? "#cdd26a" : "#aaa23a";
        } else {
          ctx.fillStyle = isLight ? "#f0d9b5" : "#b58863";
        }

        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);

        // Capture pulse animation
        const cap = captureRef.current;
        if (cap && cap.row === r && cap.col === c) {
          const alpha = 0.5 * (1 - cap.progress);
          ctx.fillStyle = `rgba(255, 60, 60, ${alpha})`;
          ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }

        // Piece
        const piece = board[r][c];
        if (piece) {
          ctx.font = `${cellSize * 0.72}px serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = piece.color === "w" ? "#ffffff" : "#1a1a1a";
          ctx.shadowColor = piece.color === "w" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.2)";
          ctx.shadowBlur = 4;
          ctx.fillText(
            PIECE_UNICODE[piece.type][piece.color],
            c * cellSize + cellSize / 2,
            r * cellSize + cellSize / 2 + 2
          );
          ctx.shadowBlur = 0;
        }

        // File/rank labels
        ctx.fillStyle = isLight ? "#b58863" : "#f0d9b5";
        ctx.font = `bold ${cellSize * 0.2}px sans-serif`;
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
        if (c === 0) ctx.fillText(String(8 - r), c * cellSize + 3, (r + 1) * cellSize - 2);
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        if (r === 7) ctx.fillText(FILES[c], (c + 1) * cellSize - 2, (r + 1) * cellSize - 2);
      }
    }
  }, [board, selected, lastMove, cellSize]);

  // Game loop — pauses when canvas is off-screen
  useEffect(() => {
    let frame: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (canvasRef.current) observer.observe(canvasRef.current);

    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (!isVisible) return; // skip draw when off-screen
      setCaptureAnim((prev) => {
        if (!prev) return prev;
        const next = prev.progress + 0.04;
        return next >= 1 ? null : { ...prev, progress: next };
      });
      drawBoard();
    };
    frame = requestAnimationFrame(loop);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [drawBoard]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor((x / rect.width) * 8);
    const row = Math.floor((y / rect.height) * 8);

    if (col < 0 || col > 7 || row < 0 || row > 7) return;

    const clicked = board[row][col];

    if (selected) {
      const [selRow, selCol] = selected;
      if (selRow === row && selCol === col) {
        setSelected(null);
        return;
      }
      // Allow move only if destination is empty or has an enemy piece
      if (clicked && clicked.color === board[selRow][selCol]?.color) {
        // Re-select own piece instead
        setSelected([row, col]);
        return;
      }
      // Move piece
      const newBoard = board.map((r) => [...r]);
      const captured = newBoard[row][col];
      newBoard[row][col] = newBoard[selRow][selCol];
      newBoard[selRow][selCol] = null;
      setBoard(newBoard);
      setSelected(null);
      setLastMove({ from: [selRow, selCol], to: [row, col] });
      setTurn((t) => (t === "w" ? "b" : "w"));
      if (captured) setCaptureAnim({ row, col, progress: 0 });
    } else {
      if (clicked && clicked.color === turn) {
        setSelected([row, col]);
      }
    }
  };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="flex items-center justify-between w-full px-1">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Mini Chess</span>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full border-2 ${turn === "b" ? "bg-gray-900 border-gray-500 ring-2 ring-amber-400" : "bg-gray-900 border-gray-500"}`}></span>
          <span className="text-xs text-muted-foreground">{turn === "w" ? "White" : "Black"} to move</span>
          <span className={`h-3 w-3 rounded-full border-2 ${turn === "w" ? "bg-white border-gray-300 ring-2 ring-amber-400" : "bg-white border-gray-300"}`}></span>
        </div>
        <button
          onClick={() => { setBoard(makeInitialBoard()); setSelected(null); setTurn("w"); setLastMove(null); }}
          className="text-xs text-primary hover:underline font-semibold"
        >
          Reset
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={width}
        height={width}
        className="rounded shadow-lg cursor-pointer"
        style={{ width: "100%", aspectRatio: "1" }}
        onClick={handleClick}
      />

      <p className="text-[11px] text-muted-foreground text-center">
        Click a piece to select, click destination to move. Capture enemy pieces!
      </p>
    </div>
  );
}

/**
 * Lightweight non-interactive chess puzzle display.
 * Shows a specific FEN-like position.
 */
interface ChessPuzzleDisplayProps {
  title?: string;
  description?: string;
  className?: string;
}

export function ChessPuzzleDisplay({ title = "Puzzle of the Day", description = "White to move and win!", className = "" }: ChessPuzzleDisplayProps) {
  return (
    <div className={`bg-card border border-border rounded-md shadow-sm p-5 ${className}`}>
      <div className="flex items-center gap-2 border-b border-border pb-3 mb-4">
        <span className="text-xl">♛</span>
        <h3 className="font-poppins font-bold text-primary text-sm uppercase tracking-wider">{title}</h3>
      </div>
      <MiniChessBoard width={260} />
      <p className="text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/40 rounded-lg px-3 py-2 mt-3 font-semibold">
        💡 {description}
      </p>
    </div>
  );
}
