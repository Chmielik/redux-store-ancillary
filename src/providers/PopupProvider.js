import React from 'react'

class PopupProvider extends React.Component {
  render() {
    const { children, popup } = this.props

    const Parent = React.cloneElement(children)
    const modifiedChildren = []

    React.Children.forEach(children, child => {
      React.Children.forEach(child.props.children, child2 => {
        const currentPopup = popup[child2.props.name]
        const params = currentPopup ? currentPopup.params : undefined
        const open = !!currentPopup || !!child2.props.open

        const clonedElement = React.cloneElement(child2, { open, params })
        if (
          (popup && Object.keys(popup).findIndex(name => name === clonedElement.props.name) !== -1) ||
          (clonedElement.props && clonedElement.props.open)
        ) {
          modifiedChildren.push(clonedElement)
        }
      })
    })

    return (
      <Parent.type {...Parent.props}>
        {modifiedChildren.map(Component => <Component.type {...Component.props} key={Component.props.name} />)}
      </Parent.type>
    )
  }
}

export default PopupProvider
