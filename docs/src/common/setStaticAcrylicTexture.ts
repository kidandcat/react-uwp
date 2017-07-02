export default function setStaticAcrylicTexture(theme: ReactUWP.ThemeType) {
  if (theme.isDarkTheme) {
    Object.assign(theme, {
      acrylicTexture40: {
        background: `url(${require("assets/images/blurBackground/dark-40.png")}) left top / cover no-repeat fixed`
      },
      acrylicTexture60: {
        background: `url(${require("assets/images/blurBackground/dark-60.png")}) left top / cover no-repeat fixed`
      },
      acrylicTexture80: {
        background: `url(${require("assets/images/blurBackground/dark-80.png")}) left top / cover no-repeat fixed`
      }
    } as ReactUWP.ThemeType);
  } else {
    Object.assign(theme, {
      acrylicTexture40: {
        background: `url(${require("assets/images/blurBackground/light-40.png")}) left top / cover no-repeat fixed`
      },
      acrylicTexture60: {
        background: `url(${require("assets/images/blurBackground/light-60.png")}) left top / cover no-repeat fixed`
      },
      acrylicTexture80: {
        background: `url(${require("assets/images/blurBackground/light-80.png")}) left top / cover no-repeat fixed`
      }
    } as ReactUWP.ThemeType);
  }
}