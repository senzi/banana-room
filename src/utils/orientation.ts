// 移动端强制横屏检测与提示
export function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|Mobile|Tablet|Phone/i.test(navigator.userAgent)
}

export function isLandscape() {
  return window.matchMedia('(orientation: landscape)').matches
}

export function onOrientationChange(cb: (isLandscape: boolean) => void) {
  window.addEventListener('orientationchange', () => {
    cb(isLandscape())
  })
  window.addEventListener('resize', () => {
    cb(isLandscape())
  })
}
