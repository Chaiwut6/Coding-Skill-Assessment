function getMinMove(start: string, target: string, brokenList: string[]): number {
  
    const moves = [
      [2, 1], [1, 2], [-1, 2], [-2, 1],
      [-2, -1], [-1, -2], [1, -2], [2, -1],
    ];
  

    function toXY(pos: string): [number, number] {
      const x = pos.charCodeAt(0) - 'a'.charCodeAt(0); 
      const y = parseInt(pos[1]) - 1; 
      return [x, y];
    }
  
    
    function toPos(x: number, y: number): string {
      return String.fromCharCode(x + 97) + (y + 1);
    }
  
    const broken = new Set(brokenList); 
    const visited = Array(8).fill(null).map(() => Array(8).fill(false)); 
    const queue: [number, number, number][] = []; 
  
    const [startX, startY] = toXY(start);
    const [targetX, endY] = toXY(target);
  
    queue.push([startX, startY, 0]); 
    visited[startX][startY] = true;
  
    while (queue.length > 0) {
      const [x, y, step] = queue.shift()!;
      const now = toPos(x, y);
  
      if (now === target) {
        return step; 
      }
  
      for (let i = 0; i < moves.length; i++) {
        const [dx, dy] = moves[i];
        const nx = x + dx;
        const ny = y + dy;
        const next = toPos(nx, ny);
  
        if (
          nx >= 0 && nx < 8 &&
          ny >= 0 && ny < 8 &&
          !visited[nx][ny] &&
          !broken.has(next)
        ) {
          visited[nx][ny] = true;
          queue.push([nx, ny, step + 1]); 
        }
      }
    }
  
    return -1; 
  }
  
  console.log(getMinMove('d6', 'h8', ['f6', 'f7']));
  