import * as React from "react";

import Button from "../Button";
import IconButton from "../IconButton";
import { ThemeType } from "../../styles/ThemeType";

const defaultProps: ContentDialogProps = __DEV__ ? require("./devDefaultProps").default : {};

export interface DataProps {
	statuBarTitle?: string;
	title?: string;
	primaryButtonText?: string;
	secondaryButtonText?: string;
	showCloseButton?: boolean;
	defaultShow?: boolean;
	contentElm?: any;
}

interface ContentDialogProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {}

interface ContentDialogState {
	show?: boolean;
}

export default class ContentDialog extends React.Component<ContentDialogProps, ContentDialogState> {
	static defaultProps: ContentDialogProps = {
		...defaultProps,
		statuBarTitle: "ContentDialog",
		title: "Delete file permanently?",
		contentElm: "If you delete this file, you won't be able to recover it. Do you want to delete it?",
		primaryButtonText: "Delete",
		showCloseButton: true,
		secondaryButtonText: "Cancel"
	};

	state: ContentDialogState = {};

	static contextTypes = { theme: React.PropTypes.object };
	context: { theme: ThemeType };

	getShowStatus = () => this.state.show

	toggleShow = (show?: boolean) => {
		if (typeof show === "bolean") {
			this.setState({ show });
		} else {
			this.setState({
				show: !this.state.show
			});
		}
	}

	containerMouseEnterHandle = (e: React.MouseEvent<HTMLDivElement>) => {
		e.currentTarget.style.border = `1px solid ${this.context.theme.accent}`;
	}

	containerMouseLeaveHandle = (e: React.MouseEvent<HTMLDivElement>) => {
		e.currentTarget.style.border = `1px solid ${this.context.theme.baseLow}`;
	}

	render() {
		// tslint:disable-next-line:no-unused-variable
		const { statuBarTitle, title, primaryButtonText, secondaryButtonText, defaultShow, showCloseButton, contentElm, ...attributes } = this.props;
		const { theme } = this.context;
		const styles = getStyles(this);

		return (
			<div
				{...attributes}
				style={{
					...styles.mask,
					...theme.prepareStyles(attributes.style),
				}}
			>
				<div
					style={styles.container}
					onMouseEnter={this.containerMouseEnterHandle}
					onMouseLeave={this.containerMouseLeaveHandle}
				>
					<div style={styles.statuBarTitle}>
						<p style={{ fontSize: 12, marginLeft: 8 }}>{statuBarTitle}</p>
						{showCloseButton
							?
							<IconButton
								style={{
									fontSize: 10,
									width: 40,
									height: 26,
								}}
								hoverStyle={{ background: "#d00f2a" }}
							>
								{"\uE894"}
							</IconButton>
							: null
						}
					</div>
					<div style={styles.content}>
						<div>
							<h5 style={styles.title}>
								{title}
							</h5>
							{typeof contentElm === "string" ? <p>{contentElm}</p> : contentElm}
						</div>
						<div style={styles.buttonGroup}>
							<Button style={{ width: "calc(50% - 2px)" }}>{primaryButtonText}</Button>
							<Button style={{ width: "calc(50% - 2px)" }}>{secondaryButtonText}</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function getStyles(contentDialog: ContentDialog): {
	mask?: React.CSSProperties;
	container?: React.CSSProperties;
	content?: React.CSSProperties;
	statuBarTitle?: React.CSSProperties;
	title?: React.CSSProperties;
	buttonGroup?: React.CSSProperties;
} {
	const { context } = contentDialog;
	const { theme } = context;
	// tslint:disable-next-line:no-unused-variable
	const { prepareStyles } = theme;

	return {
		mask: theme.prepareStyles({
			zIndex: 9999999,
			position: "fixed",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			fontSize: 14,
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			color: theme.baseHigh,
			background: theme.altMediumHigh,
		}),
		container: theme.prepareStyles({
			background: theme.altHigh,
			border: `1px solid ${theme.baseLow}`,
			flex: "0 0 auto",
			width: 280,
			cursor: "default",
			height: 320,
			transition: "all .25s 0s ease-in-out",
		}),
		content: theme.prepareStyles({
			width: "100%",
			padding: 16,
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "space-between",
		}),
		statuBarTitle: theme.prepareStyles({
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		}),
		title: {
			fontSize: 18,
			lineHeight: 1,
			marginBottom: 16,
		},
		buttonGroup: theme.prepareStyles({
			width: "100%",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		})
	};
}
