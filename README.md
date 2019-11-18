# sysvisionz-react-dropdown

This module includes a wide variety of utilities for your use in any new website. From an automatically constructed parallax element (with scroll smoothing), to dropdown menus, to 

## Getting Started

### Installation
To install, in terminal type

```
	npm i --save svz-toolkit
```

then, in your react project,

```
import svz-toolkit from 'svz-toolkit';
```  

or  

```
import {Component} from 'svz-toolkit';
```  


and finally, implement it by including that component within your code:

```
<Component
	{options}
/>
```

**##Included Components**

##Address

A component functionally allowing you to make an address and set the variables in it if you so desire.

###Optional Variables

####


##Dropdown  
A Dropdown menu element, also available individually as the sysvisionz-react-dropdown npm package.

### Necessary Variables

#### button
**accepted variables:** any string or JSX element  
**behavior:** dictates the children of the activating button.  

#### content

**accepted variables:** array of strings or JSX elements  
**behavior:** dictates the children of the entries in the dropdown menu.  If split into ```id``` and ```children```, the ```id``` property is applied as the id of the div containing this array element, and the ```children``` property dictates the children of that element.

### Optional Variables

#### drop
**accepted variables:** 'up', 'down', 'left', 'right'  
**behavior:** Defaults to 'down' variable if not specified. This dictates the direction that your dropdown menu drops out of the activating button. downLeft and upLeft are special variants; they render a normal drop, but orient the menu's edge to the opposite of the basic version (to the right edge for downLeft and upLeft, and to the bottom edge for rightUp and leftUp) to the activating button instead of the left edge. Note that, due to their nature, they make the pop variable unnecessary by definition.

#### pop
**accepted variables:** 'up', 'down', 'left', 'right'  
*cannot be opposite of drop.*  
**behavior:** Defaults to drop variable if not specified. This dictates the direction that your dropdown menu pops outwards from the inital dropped out element.

#### orientation
**accepted variables:** 'top', 'bottom', 'left', 'right', 'center'  
*top, bottom, left, and right can only be applied when **pop** prop is not used. center may always be used*  
*note that top and bottom can only be used with drop of left or right, and left or right with drop up or down*   
**behavior:** controls where the dropdown menu is oriented in relation to its supplied drop. orientation center will make a menu dropping downwards appear centered beneath the activating button, where orientation left will make the right edge of the menu align with the right edge of the activating button.

#### controlled
**accepted variables:** boolean  
**behavior:** dictates whether the menu is opened and closed by an outside variable (which is supplied through the isOpen variable)

#### keepOpen
**accepted variables:** boolean  
**behavior:** Defaults to false, unless **controlled** is true, then it defaults to true. Dictates if dropdown menu will stay open when clicking outside it or on the entries in the menu. Menu can still be closed by clicking on the activating button
**note:** if you do set this to false while controlled is true, it is highly recommended that you use the onToggle function to reset your isOpen variable accordingly!

#### onChange
**accepted variables:** function  
**behavior:** Function performed when a dropdown menu item is clicked using the entry clicked.

#### onToggle
**accepted variables:** function  
**behavior:** function performed when menu is opened or closed. Supplies boolean for whether or not the menu is open as the first variable.

#### onOpen
**accepted variables:** function  
**behavior:** function performed when menu is opened.

#### onClose
**accepted variables:** function  
**behavior:** function performed when menu is closed.

#### className
**accepted variables:** string  
**behavior:** dictates the className for the overall element. Note that this is, by design, followed by the "open" or "closed" class, depending on the state of the menu.

#### buttonClass
**accepted variables:** string  
**behavior:** dictates the className for the activating button.

#### id
**accepted variables:** string  
**behavior:** dictates the id for the dropdown containing div


### Prerequisites

The only prerequisite for the use of this is that you have React installed.

## Author

* **Colin Brennan** - *full project* - [SysVisionz](https://github.com/SysVisionz, https://www.npmjs.com/~sysvisionz)

## Version History
1.0 -   
initial release