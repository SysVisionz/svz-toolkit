# sysvisionz-react-dropdown

This module includes a wide variety of utilities for your use in any new website. From an automatically constructed parallax element (with scroll smoothing), to dropdown menus, to an element that automatically pulls and constructs a metadata preview from a url.

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

# Address

A component functionally allowing you to make an address and edit the variables in it if you set a submit function.

## Optional Props

### name
**Accepted Types:**  
**Note:** *this is a required prop if onSubmit is not set.*
**Behavior:**  


### street1
**Accepted Types:**  
**Note:** *this is a required prop if onSubmit is not set.*
**Behavior:**  


### street2
**Accepted Types:**  
**Behavior:**  

### city
**Accepted Types:**  
**Behavior:**  

### state
**Accepted Types:**  
**Behavior:**  

### zip
**Accepted Types:**  
**Behavior:**  

### number
**Accepted Types:**  
**Behavior:**  

### onSubmit
**Accepted Types:**  
**Behavior:**  

# Attention

### children
**Accepted Types:**  
**Behavior:**  

### on
**Accepted Types:**  
**Behavior:**  

# Button

### children
**Accepted Types:**  
**Behavior:**  

### id
**Accepted Types:**  
**Behavior:**  

### className
**Accepted Types:**  
**Behavior:**  

### onClick
**Accepted Types:**  
**Behavior:**  

# CompareSlideshow

### slideWidth
**Accepted Types:**  
**Behavior:**  

### slideHeight
**Accepted Types:**  
**Behavior:**  

### slideshow
**Accepted Types:**  
**Behavior:**  

### interval
**Accepted Types:**  
**Behavior:**  

### vertical
**Accepted Types:**  
**Behavior:**  

### style
**Accepted Types:**  
**Behavior:**  

# ContactForm

### name
**Accepted Types:**  
**Behavior:**  

### business
**Accepted Types:**  
**Behavior:**  

### email
**Accepted Types:**  
**Behavior:**  

### message
**Accepted Types:**  
**Behavior:**  

### onSubmit
**Accepted Types:**  
**Behavior:**  

### onChange
**Accepted Types:**  
**Behavior:**  

### isOrder
**Accepted Types:**  
**Behavior:**  

### budget
**Accepted Types:**  
**Behavior:**  

### error
**Accepted Types:**  
**Behavior:**  

### errorActive
**Accepted Types:**  
**Behavior:**  

### street1
**Accepted Types:**  
**Behavior:**  

### street2
**Accepted Types:**  
**Behavior:**  

### city
**Accepted Types:**  
**Behavior:**  

### zip
**Accepted Types:**  
**Behavior:**  

### state
**Accepted Types:**  
**Behavior:**  

### types
**Accepted Types:**  
**Behavior:**  

# Dropdown  
A Dropdown menu element, also available individually as the sysvisionz-react-dropdown npm package.

## Required Props

### children
**Behavior:** Content of the activating button.  

### content

**Accepted Types:** array of strings or JSX elements  
**Behavior:** dictates the children of the entries in the dropdown menu.  

## Optional Props

### drop
**Accepted Types:** 'up', 'down', 'left', 'right'  
**Default:** 'down'  
**Behavior:** This dictates the direction that your dropdown menu drops out of the activating button. downLeft and upLeft are special variants; they render a normal drop, but orient the menu's edge to the opposite of the basic version (to the right edge for downLeft and upLeft, and to the bottom edge for rightUp and leftUp) to the activating button instead of the left edge. Note that, due to their nature, they make the pop variable unnecessary by definition.

### pop
**Accepted Types:** 'up', 'down', 'left', 'right'  
**Default:** **drop**  
**note:** *cannot be opposite of drop.*  
**Behavior:** This dictates the direction that your dropdown menu pops outwards from the inital dropped out element.

### orientation
**Accepted Types:** 'top', 'bottom', 'left', 'right', 'center'  
**Behavior:** controls the dropdown menu relative to the activating button. 'center' will make a menu dropping downwards appear centered beneath the activating button, 'left' will make the right edge of the menu align with the right edge of the activating button, 'top' aligns the bottom edge with the bottom edge of the activating button, and so on.

### open
**Accepted Types:** Boolean  
**Default:** **false**  
**note:** *need not be set unless **controlled** is **true**.*
**Behavior:** Whether the dropdown is open or not.

### controlled
**Accepted Types:** Boolean  
**Behavior:** dictates whether the menu is opened and closed by an outside variable (which is supplied through the **open** prop).

### keepOpen
**Accepted Types:** boolean  
**Default:** **controlled**  
**Behavior:** Dictates if dropdown menu will stay open when clicking outside it or on the entries in the menu. Menu can still be closed by clicking on the activating button
**note:** if you do set this to false while controlled is true, it is highly recommended that you use the onToggle function to reset **open**!

### onToggle
**Accepted Types:** function  
**supplies:** Boolean of current open state of menu.  
**Behavior:** function performed when menu is opened or closed.

### onOpen
**Accepted Types:** function  
**Behavior:** function performed when menu is opened.

### onClose
**Accepted Types:** function  
**Behavior:** function performed when menu is closed.

### slideIn  
**Accepted Types:** Boolean  
**Behavior:** The menu does a smooth slide in animation.

### fadeIn
**Accepted Types:** Boolean  
**Behavior:** The menu does a smooth fade in animation.

### transition
**Accepted Types:** Number  
**Behavior:** Delays menu close for this many milliseconds, for the purposes of manually applied css transitions.

### className
**Accepted Types:** String  
**Behavior:** dictates the className for the overall element. Adds to prefix of **svz-dropdown-container** and is followed by **active** when the menu element is open.

### id
**Accepted Types:** String  
**Behavior:** dictates the id for the dropdown containing div

# ElemPicker

### elems
**Accepted Types:**  
**Behavior:**  

### transitionTime
**Accepted Types:**  
**Behavior:**  

### onChange
**Accepted Types:**  
**Behavior:**  

### scrollToward
**Accepted Types:**  
**Behavior:**  

### rowLength
**Accepted Types:**  
**Default:** 3
**Behavior:**  

### index
**Accepted Types:**  
**Behavior:**  

### selection
**Accepted Types:**  
**Behavior:**  

# ElemSquare

### content
**Accepted Types:**  
**Behavior:**  

### rowMax
**Accepted Types:**  
**Behavior:**  

### rowMin
**Accepted Types:**  
**Behavior:**  

# ExpanderBox

### content
**Accepted Types:**  
**Behavior:**  

### column
**Accepted Types:**  
**Behavior:**  

### closeButton
**Accepted Types:**  
**Behavior:**  

### onChange
**Accepted Types:**  
**Behavior:**  

### onOpen
**Accepted Types:**  
**Behavior:**  

### onClose
**Accepted Types:**  
**Behavior:**  

# ExpandingText

### value
**Accepted Types:**  
**Behavior:**  

### onChange
**Accepted Types:**  
**Behavior:**  

### placeholder
**Accepted Types:**  
**Behavior:**  

### maxheight
**Accepted Types:**  
**Behavior:**  

### minHeight
**Accepted Types:**  
**Behavior:**  

### onCancel
**Accepted Types:**  
**Behavior:**  

### onSubmit
**Accepted Types:**  
**Behavior:**  

### editButton
**Accepted Types:**  
**Behavior:**  

# Fader

### key
**Accepted Types:**  
**Behavior:**  

### children
**Accepted Types:**  
**Behavior:**  

# Input


### editButton
**Accepted Types:**  
**Behavior:**  

### onEditClick
**Accepted Types:**  
**Behavior:**  

### onSubmit
**Accepted Types:**  
**Behavior:**  

### clear
**Accepted Types:**  
**Behavior:**  

### active
**Accepted Types:**  
**Behavior:**  

### id
**Accepted Types:**  
**Behavior:**  

### value
**Accepted Types:**  
**Behavior:**  

### close
**Accepted Types:**  
**Behavior:**  

### label
**Accepted Types:**  
**Behavior:**  

# LoginBox


### email
**Accepted Types:**  
**Behavior:**  

### pass
**Accepted Types:**  
**Behavior:**  

### login
**Accepted Types:**  
**Behavior:**  

### persist
**Accepted Types:**  
**Behavior:**  

### loggingIn
**Accepted Types:**  
**Behavior:**  

### loggingInContent
**Accepted Types:**  
**Behavior:**  

### error
**Accepted Types:**  
**Behavior:**  


### errorActive
**Accepted Types:**  
**Behavior:**  

# MetaElement

### url
**Accepted Types:**  
**Behavior:**  

# Modal

### active
**Accepted Types:**  
**Behavior:**  

### startActive
**Accepted Types:**  
**Behavior:**  

### onOpen
**Accepted Types:**  
**Behavior:**  

### onClose
**Accepted Types:**  
**Behavior:**  

### noEsc
**Accepted Types:**  
**Behavior:**  

### closeButton
**Accepted Types:**  
**Behavior:**  

### className
**Accepted Types:**  
**Behavior:**  

### superModal
**Accepted Types:**  
**Behavior:**  

# OverlayBox

### children
**Accepted Types:**  
**Behavior:**  

### className
**Accepted Types:**  
**Behavior:**  

### content
**Accepted Types:**  
**Behavior:**  

### onClick
**Accepted Types:**  
**Behavior:**  

# Parallax

### children
**Accepted Types:**  
**Behavior:**  

### className
**Accepted Types:**  
**Behavior:**  

### id
**Accepted Types:**  
**Behavior:**  

### slow
**Accepted Types:**  
**Behavior:**  

### src
**Accepted Types:**  
**Behavior:**  

# PopContent

### children
**Accepted Types:**  
**Behavior:**  

### open
**Accepted Types:**  
**Behavior:**  

### onChange
**Accepted Types:**  
**Behavior:**  

### label
**Accepted Types:**  
**Behavior:**  

### icon
**Accepted Types:**  
**Behavior:**  

### horizontal
**Accepted Types:**  
**Behavior:**  

# ProfileCard

### birthdate
**Accepted Types:**  
**Behavior:**  

### children
**Accepted Types:**  
**Behavior:**  

### name
**Accepted Types:**  
**Behavior:**  

# ScreenManager

### children
**Accepted Types:**  
**Behavior:**  

### offset
**Accepted Types:**  
**Behavior:**  

## Passed Props

### screenLock
**Type:** Function  
**Behavior:**  

### screenLocked
**Type:** Boolean  
**Behavior:**  

### smooth
**Type:** Function  
**Behavior:**

### smoothed
**Type:** Boolean  
**Behavior:**  

### scrollToward
**Type:** Function  
**Behavior:**  

### smoothScrolling
**Type:** Function  
**Behavior:**  

### addListener
**Type:** Function  
**Behavior:**  

# Selector

### label
**Accepted Types:**  
**Behavior:**  

### onChange
**Accepted Types:**  
**Behavior:**  

### options
**Accepted Types:**  
**Behavior:**  

# Slideshow

### interval
**Accepted Types:**  
**Behavior:**  

### slideshow
**Accepted Types:**  
**Behavior:**  

### vertical
**Accepted Types:**  
**Behavior:**  

### on
**Accepted Types:**  
**Behavior:**  

### noArrows
**Accepted Types:**  
**Behavior:**  

### arrowType
**Accepted Types:** React Element or String of **fatArrow**, **fromBar**, **swoop**, **thinArrow**, **doublePointer**, **thinPointer**  
**Behavior:**  

# TagsPicker

### list
**Accepted Types:**  
**Behavior:**  

### onChange
**Accepted Types:**  
**Behavior:**  

### onSubmit
**Accepted Types:**  
**Behavior:**  

### className
**Accepted Types:**  
**Behavior:**  

### active
**Accepted Types:**  
**Behavior:**  

# Exra Functions

## Array.sameVal

## Array.standardized

## Array.sequential

## Number.confine

## Number.calcAdditive

## Number.isPositive

## Object.filter

## Object.sameVal

## callbacker

## filterJoin

## alterClass

# Extra Classes

## CookieMan

## Gradienter

## NumberMan

## TimeMan

# Dependencies

### react-html-parser  
### react  
### react-redux  
### react-router-dom  
### react-transition-group  
### url-metadata  


## Author

* **Colin Brennan** - *full project* - [SysVisionz Github](https://github.com/SysVisionz), [SysVisionz NPM Modules](https://www.npmjs.com/~sysvisionz)

## Version History
0.1 -   
initial release