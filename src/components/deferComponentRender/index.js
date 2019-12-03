import hoistStatics from 'hoist-non-react-statics';
import React from 'react';

/**
 * Allows two animation frames to complete to allow other components to update
 * and re-render before mounting and rendering an expensive `WrappedComponent`.
 */
export default function deferComponentRender(WrappedComponent) {
	class DeferredRenderWrapper extends React.Component {
		constructor(props, context) {
			super(props, context);
			this.state = { shouldRender: false };
		}

		componentDidMount() {
			window.requestAnimationFrame(() => {
				window.requestAnimationFrame(() => this.setState({ shouldRender: true }));
			});
		}

		render() {
			return this.state.shouldRender ? <WrappedComponent {...this.props} /> : null;
		}
	}

	return hoistStatics(DeferredRenderWrapper, WrappedComponent);
}
