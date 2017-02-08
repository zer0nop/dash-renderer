'use strict'

import R from 'ramda';
import React from 'react';
import Registry from './registry';
import NotifyObservers from './components/core/NotifyObservers.react';
import {createTreePath} from './reducers/utils';

export default function render(component, dependencyGraph, path=[]) {
    // Create list of child elements
    let children;

    // TODO - Rename component.content to component.children
    const props = R.propOr({}, 'props', component);
    const content = props.content;
    if (!content) {

        // No children
        children = [];

    } else if (typeof content === 'string') {

        // Text node child
        children = [component.props.content];

    } else {
        // One or multiple children

        // Recursively render the tree
        const renderChild = (child, i) =>
            render(child, dependencyGraph, R.append(i, path))

        children = (Array.isArray(content) ? content : [content])
                   .map(renderChild);

    }

    const element = Registry.resolve(component.type, component.namespace);

    const parent = React.createElement(
        element,
        Object.assign({}, component.props, {path: createTreePath(path)}),
        ...children
    );

    // has observers?
    if (
        props && props.id &&
        /*
         * in case it isn't initalized yet -
         * TODO: we should be able to remove this check
         * with like a initialization status store or something
         */
        dependencyGraph.hasNode(component.props.id) &&
        dependencyGraph.dependantsOf(component.props.id).length
    ) {
        return (
            <NotifyObservers>
                {parent}
            </NotifyObservers>
        );
    }

    return parent;
}