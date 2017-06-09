import * as React from "react";
import * as PropTypes from "prop-types";

import getTheme from "react-uwp/styles/getTheme";
import Icon from "react-uwp/Icon";
import DropDownMenu from "react-uwp/DropDownMenu";
import ColorPicker from "react-uwp/ColorPicker";
import CheckBox from "react-uwp/CheckBox";
import TextBox from "react-uwp/TextBox";

export interface DataProps {
  renderContentWidth?: number | string;
}

export interface CustomThemeProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {}

export interface CustomThemeState {}

export default class CustomTheme extends React.Component<CustomThemeProps, CustomThemeState> {
  static defaultProps: CustomThemeProps = {};

  state: CustomThemeState = {};

  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  fileInput: HTMLInputElement;

  render() {
    const {
      renderContentWidth,
      ...attributes
    } = this.props;
    const { theme } = this.context;
    const styles = getStyles(this);

    return (
      <div
        {...attributes}
        style={styles.root}
      >
        <div style={styles.content}>
          <div>
            <div style={{ width: 320, fontWeight: "lighter" }}>
              <Icon style={{ fontSize: 120, linHeight: 1.6 }}>Color</Icon>
              <p style={{ fontSize: 24 }}>Custom Beautiful Themes</p>
              <p style={{ fontSize: 13 }}>React-UWP just to achieve design specifications, more simple design of different themes, let you have complete design freedom.</p>
            </div>
            <div style={{ marginTop: 24 }}>
              <p style={{ fontSize: 18, lineHeight: 1.6 }}>
                Choose Theme
              </p>
              <DropDownMenu
                values={[
                  "Dark",
                  "Light"
                ]}
                defaultValue={theme.isDarkTheme ? "Dark" : "Light"}
                onChangeValue={value => {
                  theme.saveTheme(getTheme({
                    themeName: value.toLowerCase() as any,
                    accent: theme.accent,
                    useFluentDesign: theme.useFluentDesign,
                    desktopBackgroundImage: theme.desktopBackgroundImage
                  }));
                }}
              />
              <CheckBox
                style={{ marginLeft: 8 }}
                defaultChecked={theme.useFluentDesign}
                label="Use New Fluent Design"
                onCheck={useFluentDesign => {
                  theme.saveTheme(getTheme({
                    themeName: theme.themeName,
                    accent: theme.accent,
                    useFluentDesign,
                    desktopBackgroundImage: theme.desktopBackgroundImage
                  }));
                }}
              />
              <TextBox
                background="none"
                value="Paste Image URL or Upload..."
                style={{ marginTop: 4 }}
                onChangeValue={desktopBackgroundImage => {
                  const image = new Image();
                  image.addEventListener("load", function(e) {
                    theme.saveTheme(getTheme({
                      themeName: theme.themeName,
                      accent: theme.accent,
                      useFluentDesign: theme.useFluentDesign,
                      desktopBackgroundImage
                    }));
                  });
                  image.src = desktopBackgroundImage;
                }}
                rightNode={
                  <Icon
                    style={{
                      fontSize: 12,
                      height: 32,
                      width: 32,
                      lineHeight: "32px",
                      cursor: "pointer"
                    }}
                    hoverStyle={{
                      background: theme.listLow
                    }}
                    onClick={() => {
                      this.fileInput.click();
                    }}
                  >
                    UpLegacy
                  </Icon>
                }
              />
              <input
                ref={fileInput => this.fileInput = fileInput}
                type="file"
                style={{ display: "none" }}
                onChange={e => {
                  const file = e.currentTarget.files[0];
                  const reader  = new FileReader();
                    reader.addEventListener("load", () => {
                      theme.saveTheme(getTheme({
                        themeName: theme.themeName,
                        accent: theme.accent,
                        useFluentDesign: theme.useFluentDesign,
                        desktopBackgroundImage: reader.result
                      }));
                    }, false);
                  if (file) {
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          </div>
          <div style={{ padding: "20px 0" }}>
            <ColorPicker
              defaultColor={theme.accent}
              onChangedColor={color => {
                theme.saveTheme(getTheme({ themeName: theme.themeName, accent: color }));
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

function getStyles(customTheme: CustomTheme): {
  root?: React.CSSProperties;
  content?: React.CSSProperties;
} {
  const {
    context: { theme },
    props: { style, renderContentWidth }
  } = customTheme;
  const { prepareStyles } = theme;

  return {
    root: prepareStyles(style),
    content: prepareStyles({
      padding: 20,
      width: renderContentWidth,
      margin: "0 auto",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap"
    })
  };
}
