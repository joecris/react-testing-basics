# Accessibility (A11Y) Guide for Web Development

A simple guide on accessibility for web development based on web.dev https://web.dev/learn/accessibility

## What is Digital A11Y

### Individual Impact

The World Health Organization (WHO) estimates that over 15% of the world's population—or 1.3 billion people—self-identify as having a disability, making this group the largest minority group globally.

### Business Impact

According to the American Institutes for Research (AIR), the total after-tax disposable income for working-age Americans with disabilities is about $490 billion annually. This number is similar to other significant market segments in the US, such as the Black ($501 billion) and Latinx ($582 billion) communities. Companies that don't plan for, design, and build accessible products can lose out on this potential revenue.

### Legal Impact

Australia's primary digital accessibility legislation is the Disability Discrimination Act 1992 (DDA), which makes it unlawful to discriminate against people with disabilities in public-facing digital services, websites, and apps.

Australian Government agencies are strictly required to comply with WCAG 2.2 Level AA

## How is Digital A11Y measured

Typically, we evaulate digital products against a set of accessibility standards ex. WCAG (https://www.w3.org/WAI/standards-guidelines/wcag/). We commonly refer to this as A11Y Audit.

### We Content Accessibility Guidelines (WCAG)

An international set of accessibility standards developed through W3C and is primarily intended for web-based and mobile app designers and developers.

The current version of WCAG is 2.2 (https://www.w3.org/TR/WCAG22/)

WCAG has 3 levels of success criteria: A, AA, AAA

- A : 30 success criteria
- AA : 20 success criteria
- AAA : 28 success criteria

Example, if your accessibility goal is AA, you must pass 50 (A + AA) success criteria

### A11Y Principles

POUR - Perceivable, Operable, Understandable and Robust
These principles help you understand and meet the diverse needs of your users.

see (https://web.dev/learn/accessibility/measure#accessibility_principles)

## ARIA and HTML

ARIA stands for Acessible Rich Internet Applications. ARIA was first introduced in 2008 by the Web Accessibility Initiative group which is a subset of W3C.

ARIA is a set of attributes you can add to HTML elements to increase their accessibility. These attributes communicate role, state and property to assistive technologies using accessibility APIs found in modern browsers. This communication happens through the accessibility tree.

### A11Y tree

ARIA modifies incorrect or incomplete code to create a better experience for those using AT by changing, exposing, and augmenting parts of the accessibility tree.

The accessibility tree is created by the browser and based on the standard Document Object Model (DOM) tree. Like the DOM tree, the accessibility tree contains objects representing all the markup elements, attributes, and text nodes. The accessibility tree is also used by platform-specific accessibility APIs to provide a representation that assistive technologies can understand.

- Roles define what an element does on the page or app

```
<div role=button">Submit</div>
```

- Properties express characteristics or relationships to an object

```
<div role="button" aria-describedby="more-info">Submit</div>
<div id="more-info">This form will be sibmitted.</div>
```

- States and values define the current conditions or data values associated with the element.

```
<div role="button" aria-describedby="more-info" aria-pressed="false">
  Submit
</div>

<div id="more-info">
  This form will be sibmitted.
</div>
```

See debugging A11Y tree using chrome dev tools (https://developer.chrome.com/blog/full-accessibility-tree)

Chrome has several dev tools for testing and debugging A11Y such as Lighthouse, Elements -> Accessibility (which can be used to access the A11Y tree)

### When to use ARIA

1. Don't use ARIA, this means that use ARIA as a 'last resort' if HTML element doesn't have accessibility support. When in doubt, use the correct semantic elements

```
DONT!

<a role="button">Submit</a>

DO

<button>Submit</button>
```

2. Don't add (unnecessary) ARIA to HTML. In most circumstances, HTML elements work well as-is and don't need additional ARIA added to them.

```
DONT!

<h2 role="tab">Heading tab</h2>

DO

<div role="tab"><h2>Heading tab</h2></div>
```

3. Always support keyboard navigation.
   All interactive (not disabled) ARIA controls must be keyboard accessible. You can add tabindex= "0" to any element that needs a focus that doesn't normally receive keyboard focus. Avoid using tab indexes with positive integers whenever possible to prevent potential keyboard focus order issues.

see: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex

```
DONT!

<span role="button" tabindex="1">Submit</span>

DO

<span role="button" tabindex="0">Submit</span>
```

Accessibility Best Practices:

- Don't substitute for semantic HTML: Do not put tabindex="0" on a div to make a button. Use a real button instead. Real interactive elements natively handle keyboard events (like pressing Enter or Space), which a div will not do without extra JavaScript.
- Keep a logical source order: Instead of utilizing positive tabindex values to fix a broken layout, rearrange your HTML structure so the elements flow naturally from top to bottom, left to right.

4. Don't hide focusable elements. Don't add role= "presentation" or aria-hidden= "true" to elements that need to have focus—including elements with a tabindex= "0".

```
DONT!

<div aria-hidden="true">
  <button>Submit</button>
</div>

DO

<div>
  <button>Submit</button>
</div>
```

5. Use accessible names for interactive elements. The purpose of an interactive element needs to be conveyed to a user before they know how to interact with it. Ensure that all elements have an accessible name for people using AT devices.

```
For each of the following code samples, the accessible name is "Red leather boots."

<!-- A plain link with text between the link tags. -->
<a href="shoes.html">Red leather boots</a>

<!-- A linked image, where the image has alt text. -->
<a href="shoes.html"><img src="shoes.png" alt="Red leather boots"></a>

<!-- A checkbox input with a label. -->
<input type="checkbox" id="shoes">
<label for="shoes">Red leather boots</label>
```

See more of the guides at https://www.w3.org/TR/using-aria/

## Content Structure

When you use semantic HTML elements, the inherent meaning of each element is passed on to the accessibility tree and used by the AT, giving more meaning to the content than non-semantic elements.

https://web.dev/learn/html/semantic-html

### Landmarks

Landmarks ensure content is in navigable regions. It's recommended that you supply at least one landmark per page.

HTML Landmark elements include

```
<header> <aside> <footer> <nav> <main> <form> <section>
```

### Headings

When implemented correctly, HTML heading levels form a succinct outline of the overall page content.

There are six heading levels we can use. Heading level one h1 is used for the page's highest and most important information, moving incrementally to heading level six h6 for the lowest and least important information.

The sequence of the heading levels is important. Ideally, you won't skip heading levels, for example, starting a section with an h1 and immediately following it with an h5. Instead, you should progress to the h5 in order. Heading level order is especially important to AT users as this is one of their primary ways to navigate through content.

### Lists

HTML lists are a way to semantically group items similar to one other giving them inherent meaning

```
<ol> - ordered list
<ul> - unordered list
<dl> - description list (uses <dt> desc term <dd> desc definition)
```

When programmed correctly, these elements can inform non-sighted AT users about the visible structure of the list. When an AT encounters a semantic list, it can tell the user the list name and how many items are in it. As the user navigates within the list, the AT will read each list item out loud and tell which number it's in the list—item one of five, item two of five, and so on.

Grouping items into lists also helps sighted people who have cognitive and attention disorders and those with reading disabilities, as list content is typically styled to have more visual whitespace and the content is to the point.

### Tables

Depending on the table's purpose, you'll use different semantic structural elements. Tables can be very complex in structure, but when you stick to the basic semantic rules, they are fairly accessible without much intervention.

Depending on the complexity of the table, forming relationships through code is accomplished in different ways. The first step to making a table accessible is to mark up header cells with th and data cells with td elements.

For more complex tables, you may need to use additional HTML table elements such as rowgroup, colgroup, caption, and scope to convey meaning and relationships.

## Document

### Page title

The HTML `<title>` element defines the content of the page or screen a user is about to experience. It's found in the `<head>` section of an HTML document and is equivalent to the `<h1>` or main topic of the page. The title content is displayed in the browser tab and helps users understand which page they are visiting, but it is not displayed on the website or app itself.

When writing page titles, it is also best practice to "front load" the interior page or important content first, then add any preceding pages or information after. This way, AT users don't have to sit through the information they have already heard.

```
DONT!
<title>The Food Channel | Outrageous Pumpkins | Season 3 </title>

DO
<title>Season 3 | Outrageous Pumpkins | The Food Channel</title>
```

### Language

Page language
The page language attribute (lang) sets the default language for the entire page. This attribute is added to the `<html>` tag. A valid language attribute should be added to every page as it signals the AT to which language it should use.

It's recommended that you use two-character ISO language codes for greater AT coverage, as many of them do not support extended language codes.

```
DO
<html lang="en">...</html>
```

Section language - You can also use the language attribute (lang) for language switches in the content itself. The same basic rules apply as the full-page language attribute, except you add it to the appropriate in-page element instead of on the `<html>` tag.

```
<html lang="en">
  <body>...
    <div>
      <p>While traveling in Estonia this summer, I often asked,
        <span lang="et">"Kas sa räägid inglise keelt?"</span>
        when I met someone new.</p>
    </div>
  </body>
</html>
```

### iFrames

To make your `<iframe>` accessible, there are a couple of aspects to consider. First, each `<iframe>` with distinct content should include a title element inside the parent tag. This title supplies AT users with more information about the content inside the `<iframe>`.

Second, as a best practice, it is good to set the scrolling to "auto" or "yes" in the `<iframe>` tag settings. This allows people with low vision to be able to scroll into content within the `<iframe>` that they might not otherwise be able to see. Ideally, the `<iframe>` container would also be flexible in its height and width.

```
DO
<iframe title="Google Pixel - Lizzo in Real Tone"
  src="https://www.youtube.com/embed/3obixhGZ5ds"
  scrolling="auto">
</iframe>
```

## Keyboard focus

A large part of keyboard accessibility is centered around focus. Focus refers to the element on the screen actively receiving input from the keyboard.

### Focus order

The elements that a keyboard user can navigate to are called focusable elements. Focus order, also called tab or navigation order, is the order in which elements receive focus. The default focus order must be logical, intuitive, and match the visual order of a page.

By default, focus order includes naturally focusable HTML elements, such as links, checkboxes, and text inputs. Naturally focusable HTML elements include built-in tab order support and basic keyboard event handling.

You can update the focus order to include any elements that don't normally receive focus, such as non-interactive HTML elements, custom components, or elements with ARIA, and override the natural focus semantics.

Note: Your tab key moves the keyboard focus up the DOM. shift+tab moves the focus down the DOM.

### Tab index

The focus order begins with elements that have a positive tabindex attribute (if there are any) and moves from the smallest positive number to the largest (such as 1, 2, 3). It then proceeds through elements with a tabindex of zero according to their order in the DOM. Any elements with a negative tabindex are removed from the natural focus order.

When a tabindex of zero (tabindex="0") is applied to normally unfocusable elements, they are added into the natural focus order of the page according to the way they appear in the DOM. However, unlike naturally focusable HTML elements, you must provide additional keyboard support for them to be fully accessible.

Caution: In general, you should avoid positive tabindex. Giving focus to non-interactive elements and disrupting the normal focus order may confuse and frustrate your users. Rarely do circumstances warrant adding a positive tabindex, such as tabindex=1 to a non-focusable element.

### Skip links

Most websites today have a long list of menu links in the page's main header consistent from page to page. This is great for general navigation but can make it difficult for keyboard-only users to easily get to the website's main content without having to tab multiple times.

One way to jump over redundant or unuseful groups of links is to add a skip link. Skip links are anchor links that jump to a different section of the same page, using that section's ID, instead of sending the user to another page on the website or an external resource. Skip links are typically added as the first focusable element a user will encounter when arriving at a website and can be visible or visually hidden until a user tabs to it, depending on what the design calls for.

```
<header>
  <a href="#content" class="visually-hidden">Skip to main content</a>
  <nav>
    <ul>
      <li><a href="#">Menu item 1</a></li>
      <li><a href="#">Menu item 2</a></li>
      <li><a href="#">Menu item 3</a></li>
      <li><a href="#">Menu item 4</a></li>
      <li><a href="#">Menu item 5</a></li>
    </ul>
  </nav>
</header>
<main id="content">
  <h1>Hello world!</h1>
  <div>Lorem ipsum dolor set</div>
</main>
```

### Focus indicator

It's also important to decide how that focus is styled. A visible focus indicator is critical in informing users about where they are at all times on the page. This is especially important for your sighted keyboard-only users.

```
DONT!
a:focus {
  outline: none; /* don't do this! */
}

DO
a:focus {
  outline: auto 5px Highlight; /* for non-webkit browsers */
  outline: auto 5px -webkit-focus-ring-color; /* for webkit browsers */
}
```

## Javascript

JavaScript can have a huge impact on the accessibility of your site. There are some general patterns for accessibility that are enhanced by JavaScript, as well as solutions for accessibility issues that arise from using JavaScript frameworks.

### Trigger events

f an onClick() event is used on a semantic HTML element such as a `<button>` or `<a>`, it naturally includes both mouse and keyboard functionality. However, keyboard functionality is not automatically applied when an onClick() event is added to a non-semantic element, such as a generic `<div>`.

### Page titles

If you use a JavaScript framework, you need to consider how you handle page titles. This is especially important for single-page apps (SPAs) that load from a singular index.html file, as transitions or routes (page changes) don't involve a page reload. Each time a user loads a new page in an SPA, the title won't change by default.

### Dynamic content

| Possible misuse                                                                | Correct use                                                                                                                                                    |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Render large chunks of non-semantic HTML                                       | Render smaller pieces of semantic HTML                                                                                                                         |
| Not allowing time for dynamic content to be recognized by assistive technology | Using a setTimeout() time delay to allow users to hear the full message                                                                                        |
| Applying style attributes for onFocus() dynamically                            | Use :focus for the related elements in your CSS stylesheet                                                                                                     |
| Applying inline styles may cause user stylesheets to not be read properly      | Keep your styles in CSS files to keep the consistency of the them                                                                                              |
| Creating very large JavaScript files that slow down overall site performance   | Use less JavaScript. You may be able to perform similar functions in CSS (such as animations or sticky navigation), which parse faster and are more performant |
|                                                                                |

### Focus management

You can create keyboard traps when a component's focus is not properly managed. A keyboard trap occurs when a keyboard-only user gets stuck in a component, or the focus is not maintained when it should be.

One of the most common patterns where users experience focus management issues is in a modal component. When a keyboard-only user encounters a modal, the user should be able to tab between the actionable elements of the modal, but they should never be allowed outside of the modal without explicitly dismissing it. JavaScript is essential to properly trapping this focus.

Focus must also be maintained when a user navigates from page-to-page. This is especially true in SPAs, where there is no browser refresh, and all content dynamically changes. Anytime a user clicks on a link to go to another page within your application, the focus is either kept in the same place or potentially placed somewhere else entirely.

When transitioning between pages (or routing), the development team must decide where the focus goes when the page loads.

There are multiple techniques to achieve this:

- Place focus on the main container with an aria-live announcement.
- Put the focus back to a link to skip to the main content.
- Move the focus to the top-level heading of the new page.

Where you decide to put the focus will depend on the framework you are using and the content you want to serve up to your users. It may be context- or action-dependent.

### State management

Another area where JavaScript is critical to accessibility is state management, or when a component or page's current visual state is relayed to a low-vision, blind, or deafblind assistive technology user.

Often, the state of a component or page is managed through ARIA attributes, as introduced in the ARIA and HTML module. Let's review a few of the most common types of ARIA attributes used to help manage the state of an element.

For example, you may use an aria-expanded attribute to tell the user whether a drop-down menu or list is expanded or collapsed.

Developers often use a visually hidden area called the ARIA live region to announce changes on the screen and alert messages to assistive technology (AT) users. This area can be paired with JavaScript to notify users of dynamic changes to the page without requiring the entire page to reload.

https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions

Example of live region

```
<fieldset>
  <legend>Planet information</legend>
  <label for="planetsSelect">Planet:</label>
  <select id="planetsSelect" aria-controls="planetInfo">
    <option value="">Select a planet…</option>
    <option value="mercury">Mercury</option>
    <option value="venus">Venus</option>
    <option value="earth">Earth</option>
    <option value="mars">Mars</option>
  </select>
  <button id="renderPlanetInfoButton">Go</button>
</fieldset>

<div role="region" id="planetInfo" aria-live="polite">
  <h2 id="planetTitle">No planet selected</h2>
  <p id="planetDescription">Select a planet to view its description</p>
</div>

<p>
  <small>
    Information from
    <a href="https://en.wikipedia.org/wiki/Solar_System">Wikipedia</a>
  </small>
</p>
```

https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions#roles_with_implicit_live_region_attributes

Useful React live packages

- https://www.npmjs.com/package/react-aria-live
- https://github.com/thinkcompany/react-a11y-announcer

Note: above packages may be old and outdated.

## Images

You may ask yourself:

- Is the image essential to understanding the context of the feature or page?
- What type of information is the image trying to convey?
- Is the image simple or complex?
- Does the image elicit emotion or prompt the user to act?
- Or is the image just visual "eye candy" with no real purpose?

Try hiding the images on your site or web app using a browser extension or other methods. Then ask yourself: "Do I understand the content that remains?" If the answer is yes, it's most likely a decorative image. If not, the image is instead informative in some way and contextually necessary. Once you determine the image's purpose, you can determine the most accurate way to code for it.

### Decorative images

A decorative image is a visual element that doesn't add additional context or information that allows the user to better understand the context. Decorative images are supplemental and may provide style rather than substance.

If you decide an image is decorative, the image must be programmatically hidden from ATs.

A role set to presentation or none removes an element's semantics from exposure to the accessibility tree. Meanwhile, aria-hidden= "true" removes the entire element—and all of its children—from the accessibility API.

```
<!-- All of these choices lead to the same result. -->
<img src=".../Ladybug.jpg" role="presentation">
<img src=".../Ladybug.jpg" role="none">
<img src=".../Ladybug.jpg" aria-hidden="true">
```

Use `aria-hidden` with caution as it may hide elements that you don't want to hide.

### Informative images

An informative image is an image that conveys a concept, idea, or emotion. Informative images include photos of real-world objects, essential icons, simple drawings, and images of text.

If your image is informative, you should include programmatic alternative text describing the purpose of the image. Alternative image descriptions—often abbreviated as "alt text"—give AT users more context about an image and help them better understand an image's message or intent.

You can add alternative descriptions to `<img>` elements by including the alt attribute. This applies to all file types, including JPG, PNG, or an SVG.

```
<img src=".../Ladybug_Swarm.jpg"
  alt="A swarm of red ladybugs is resting on the leaves of my prize rose bush.">
```

When you use `<svg>` elements inline, however, you need to pay additional attention to accessibility. SVGs are semantically coded, so AT skips over them by default.

If the SVG is a decorative image, this is fine—the AT will ignore it as intended. But if your SVG is an informative image, add the ARIA role="img" to the element, so AT recognizes it as an image.

Second, `<svg>` elements don't use the alt attribute, so different coding methods must be used instead to add alternative descriptions to your informative images.

```
<svg role="img">
  <title>Cartoon drawing of a red, black, and gray ladybug.</title>
</svg>
```

### Functional images

A functional image is connected to an action. An example of a functional image is a logo that links to the home page, a magnifying glass used as a search button, or a social media icon that directs you to a different website or app.

Like informative images, functional images must include an alternative description to inform all users of their purpose. Unlike an informative image, each functional image needs to describe the image action—not the visual aspects.

```
<div title="Navigate to the homepage">
   <a href="/">
      <img src=".../Ladybug_Logo.png" alt="Lovely Ladybugs for your Lawn"/>
   </a>
</div>
```

You can see from the code snippet that "Navigate to the homepage" is the wrapper title, and the image alternative text is "Lovely Ladybugs for your Lawn." When you listen to the logo code with a screen reader, you hear both the visual and the action conveyed in one image.

### Complex images

A complex image often requires more explanation than a decorative, informational, or functional image. It requires both a short and a long alternative description to convey the full message. Complex images include infographics, maps, graphs/charts, and complex illustrations.

One way to add additional explanation to an image is to link out to a resource or provide a jump link to a longer explanation later on the page. This method is a good choice, not only for AT users but also helps people with disabilities—such as cognitive, learning, and reading disabilities—who might benefit from having this additional image information readily available on the screen instead of buried in the code.

```
<img src=".../Ladybug_Anatomy.svg" alt="Diagram of the anatomy of a ladybug.">
<a href="ladybug-science.html">Learn more about the anatomy of a ladybug</a>
```

Another method you can use is to append the aria-describedby attribute to the `<img>` element. You can programmatically link the image to an ID containing a longer description. This method creates a strong association between the image and the full description. The extended description can be displayed on the screen or visually hidden—but consider keeping it visible to support even more people.

```
<div class="grid">
  <div class="grid-item">
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/Coccinellidae_%28Ladybug%29_Anatomy.svg" alt="Diagram of the anatomy of a ladybug." aria-describedby="description">
    <p id="description">In this course, you will learn more about the anatomy of a ladybug, including the head, antenna, eye, pronotum, elytra, leg, abdomen, and wing.</p>
  </div>
</div>
```

One other way to group short alternative descriptions with a longer one is to use the `<figure>` and `<figcaption>` elements. These elements act similarly to aria-describedby in that it semantically groups elements, forming a stronger association between the image and its description.

Adding ARIA role="group" ensures backward compatibility with older web browsers that don't support the semantics of the `<figure>` element.

```
<div class="grid">
  <div class="grid-item">
    <figure role="group">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/Coccinellidae_%28Ladybug%29_Anatomy.svg" alt="Diagram of the anatomy of a ladybug.">
      <br><br>
      <figcaption>
        <a href="ladybug-science.html">Learn more about the anatomy of a ladybug</a>
      </figcaption>
    </figure>
  </div>
</div>
```

Some additional alternative text best practices include:

- Avoid using words like "image of" or "photo of" in the description, as the screen reader will identify these file types for you.
- When naming your images, be as consistent and accurate as possible. Image names are a fallback when the alternative text is missing or ignored.
- Avoid using non-alpha characters (for example, #, 9, &) and use dashes between words rather than underscores in your image names or alternative text.
- Use proper punctuation whenever possible. Without it, the image descriptions will sound like one long, never-ending, run-on sentence.
- Write alternative text like a human and not a robot. Keyword stuffing does not benefit anyone—people using screen readers will be annoyed, and search engine algorithms will penalize you.

## Color and contrast

### Perceive color

Did you know that objects don't possess color but reflect wavelengths of light? When you see color, your eyes receive and process those wavelengths and convert them to colors.

When it comes to digital accessibility, we talk about these wavelengths in terms of hue, saturation, and lightness (HSL). The HSL model was created as an alternative to the RGB color model and more closely aligns with how a human perceives color.

Hue is a qualitative way to describe a color, such as red, green, or blue, where each hue has a specific spot on the color spectrum with values ranging from 0 to 360, with red at 0, green at 120, and blue at 240.

Saturation is the intensity of a color, measured in percentages ranging from 0% to 100%. A color with full saturation (100%) would be very vivid, while a color with no saturation (0%) would be grayscale or black and white.

Lightness is a color's light or dark character, measured in percentages ranging from 0% (black) to 100% (white).

### Calculate color contrast

The color contrast formula uses the relative luminance of colors to help determine contrast, which can range from 1 to 21. This formula is often shortened to [color value]:1. For example, pure black against pure white has the largest color contrast ratio at 21:1.

Regular-sized text, including images of text, must have a color contrast ratio of 4.5:1 to pass the minimum WCAG requirements for color. Large-sized text and essential icons must have a color contrast ratio of 3:1. Large-sized text is characterized by being at least 18pt / 24px or 14pt / 18.5px bolded. Logos and decorative elements are exempt from these color contrast requirements.

### Using color

Without good color contrast levels in place, words, icons, and other graphical elements are hard to discover, and the design can quickly become inaccessible. But it's also important to pay attention to how the color is used on the screen, as you cannot use color alone to convey information, actions, or distinguish a visual element.

For example, if you say, "click the green button to continue," but omit any additional content or identifiers to the button, it would be difficult for people with certain types of colorblindness to know which button to click. Similarly, many graphs, charts, and tables use color alone to convey information. Adding another identifier, like a pattern, text, or icon, is crucial to help people understand the content.

Reviewing your digital products in grayscale is a good way to detect potential color issues quickly.

### Color-focused media queries

Beyond checking for color contrast ratios and the use of color on your screen, you should consider applying the increasingly popular and supported media queries that offer the users more control over what is displayed on the screen.

For example, using the @prefers-color-scheme media query, you can create a dark theme, which can be helpful to people with photophobia or light sensitivity. You could also build a high contrast theme with @prefers-contrast, which supports people with color deficiencies and contrast sensitivity.

### Animation and motion

Beyond checking for color contrast ratios and the use of color on your screen, you should consider applying the increasingly popular and supported media queries that offer the users more control over what is displayed on the screen.

For example, using the @prefers-color-scheme media query, you can create a dark theme, which can be helpful to people with photophobia or light sensitivity. You could also build a high contrast theme with @prefers-contrast, which supports people with color deficiencies and contrast sensitivity.

### Flashing and moving content

When building animation and motion, ask yourself whether the element's movement is excessive. For example, colors flickering from dark to light or quick movements on the screen, can cause seizures in people with photosensitive epilepsy.

The WCAG's guidelines on flashing recommend against the following:

- Flashes for more than three times in any one second
- Flashes below the general flash and red flash threshold.

For any extreme movement, it is imperative that you test it using the Photosensitive Epilepsy Analysis Tool (PEAT). https://trace.umd.edu/peat/

### Puase, stop, or hide movement

Add a pause, stop, or hide mechanism to your page to allows users to turn off potentially problematic motion animation. You can do this on the screen level or element level.

### Use media queries

@prefers-reduced-motion
Similar to the color-focused media queries in the color module, the `@prefers-reduced-motion` media query checks the user's OS settings related to animation.

## Typography

Even with accessible font families, people with low vision, cognitive, language, and learning disabilities may struggle to process the text due to other elements such as font variations, size, spacing, and kerning—to name a few.

### Typeface

The quickest way to create an accessible design is to choose a common typeface (such as Arial, Times New Roman, Calibri, Verdana, and many others).

In addition to choosing a common typeface, be sure to avoid ornate or handwritten typefaces, as well as ones with only one character case available (for example, only uppercase characters). These specialty typefaces with cursive designs, quirky shapes, or artistic features like thin lines may look nice, but they are much harder for some people with disabilities to read than common typefaces.

Common readability offenders are the uppercase `I` (India), lowercase `l` (lettuce), and the number `1`. Likewise, letter pairs like `b` and `d`, `p` and `q`, `f` and `t`, `i` and `j`, `m` and `w`, and `n` and `u` may appear flipped, either left-right or up-down, for some readers.

The copy's readability also decreases when the letter spacing or kerning is too tight. Pay special attention to kerning, especially between the problematic letter pair `r/n`. Otherwise, words like "yarn" could change to "yam" or "stern" to "stem," entirely changing the meaning of the copy.

When you are looking for your next typeface, pay particular attention to the following:

- Use common fonts whenever possible.
- Avoid using elaborate or handwritten fonts and those with only one character case.
- Pick a typeface with unique characteristics—paying special attention to the uppercase I, lowercase l, and 1.
- Review certain letter combinations to be sure they are not an exact mirror image of one another.
- Check the kerning, especially between the r and n letter pair.

### Font size and typographic styling

People often assume that picking out an accessible font family is all there is to creating inclusive content, but it is also important to consider the font size and how the text is styled on a page.

```
DONT!
h2 {font-size: 16px;}

DO
h2 {font-size: 1rem;}
```

Since you cannot predict what every user's needs are, when adding fonts to your websites and web applications, be sure to consider the following guidelines:

- Base font sizes should be defined with a relative value (%, rem, or em) to allow for resizing.
- Limit the number of typeface variations like color, bold, ALL CAPS, and italics to increase readability. Instead, use methods to emphasize words in your copy, such as asterisks, dashes, or highlighting an individual word.
- Use markup instead of text on images whenever possible. Screen readers cannot read embedded text on images (without extra code added), and embedded text can also become pixelated when magnified by low-vision users.

### Structure and layout

While typeface, font size, and typographic styling are important to accessible typography, the structure and layout of copy on a page can be equally important to a user's understanding.

Complex layouts can be a real barrier for people with low vision, reading disabilities, and the 6.1 million people in the US with ADHD. These types of disabilities make it more difficult for people to keep their place and follow the flow of the copy due to the lack of clear linear pathways, missing headings, and ungrouped elements.

An important aspect of accessible layout designs is making critical elements distinct from one another and grouping similar elements together. If the elements are too close, it can be difficult to tell where one element begins and ends, especially if they have similar styling.

Think about your copy as a collection of individual bullet points on an outline. This will help you plan out the overall page structure and enable you to use headings, subheadings, and lists whenever appropriate.

### Spacing

Paragraph, sentence, and word spacing helps readers retain their focus on the copy and adds to the page's overall visual understanding. Long lines of copy can be a barrier for readers with disabilities, as they have trouble keeping their place and following the flow of the copy.

### Content alignment

Another frustration for many people with disabilities is reading justified copy. The uneven spacing between words in justified copy can cause "rivers of space" to form down the page, making the copy difficult to read.

Text justification can also cause words to be either bunched together or stretched in unnatural ways, so readers can find it difficult to locate word boundaries.

When considering structure and layout, be sure to:

- Use elements like headings, subheadings, lists, numbers, quote blocks, and other visual groupings to break the page into sections.
- Use clearly defined paragraphs, sentences, and word spacing.
- Build columns of copy that are smaller than 80 characters in width (40 characters for logograms).
- Avoid justified paragraph alignment, which creates "rivers of space" within the copy.

Some tools:
https://thegoodlineheight.com/
https://grtcalculator.com/

## Video and Audio

### Alternative media types

Alternative media types were developed to support the media needs of people with disabilities. This gives people additional formats to choose from when accessing audio and video content.

The alternative media types you must include with your media files depend on:

- The type of media you are supporting—audio-only, video-only, or video with audio (multimedia) formats
- Whether the media is live or prerecorded
- The version and level of WCAG compliance you are targeting
- Any additional media-related user needs

To create accessible audio and video content for websites and apps, there are four main types of alternative media types: `captions`, `transcripts`, `audio descriptions`, and `sign language interpretation`.

### Captions

Captions are written text synchronized with multimedia content for people who can't hear or understand spoken words. They are presented in the same language as the main audio track and include important non-speech information, such as sound effects, background noises, and essential music.

Captions come in two forms—open or closed.

- Closed captions (CC) are text on top of a video that can be turned on or off by the viewer and, depending on the media player, styled in a way that fits the user's needs.
- Open captions (OC) are text burned into the video and cannot be turned off or styled differently.

People often confuse captions with subtitles, but they aren't synonymous. Both are text synchronized with multimedia content, often appearing at the bottom of the media. Captions can be thought of as a transcription of dialogue and other essential sounds for people with disabilities. Subtitles are visual text for people who can hear the audio track but may not understand what was said, such as when watching a foreign language film.

### Transcripts

Close cousins to captions, transcripts are detailed, text-based documents that capture all essential words, sounds, and important visual information in your media. Transcripts primarily help people who are hard of hearing or deaf, and descriptive transcripts help people who are deafblind.

Search bots can't access your captions but can crawl your text transcripts. When you include transcripts with your media files, your search engine optimization gets a boost. It's one of those rare exceptions when duplicate content isn't confusing to users or penalized by search engine algorithms.

Every media player handles transcripts in a different way. Some providers may not have that feature built into their media player, and even when they do, some users may not be able to access the transcript interface. You can ensure you've made your transcript available to all users by:

- Including the transcript text directly in-context, on the page with the embedded video.
- Adding a link to an accessible PDF containing the transcript.
- Linking out to the copy on another page.
- Including a link to the transcript, wherever it lives, within the video description on whatever media player platform you've used (such as YouTube or Vimeo).

### Audio descriptions

Another alternative media used to support people with disabilities is audio description. This type of alternative media utilizes a narrator to explain important visual information to people who can't see the visual content. These descriptions include nonverbal information such as facial expressions, unspoken actions, and the background environment in video-only and multimedia content.

Sometimes audio descriptions need to be very detailed due to the large amount of information that needs to be shared with the viewer. If there aren't enough natural pauses in the video for audio descriptions, extended audio descriptions are used. In extended audio descriptions, a video will pause to give a narrator enough time to convey all the information in the media before playing the rest of the video.

Audio descriptions and extended audio descriptions help people who are blind or have low vision, but could help people with some cognitive disorders as well.

example: https://www.youtube.com/watch?v=fNq5jWyEeWo

### Sign language interpretation

Another major alternative media type you may encounter is sign language interpretation, where an interpreter narrates the auditory portion of the audio-only or multimedia content using sign language. This is very important for many people who are deaf, as sign language is their first and most fluent language.

Sign language interpretation is often more expressive and detailed than written documents, providing a much richer experience than captions or transcripts alone

## Forms

A form is an element that allows a user to provide data into a field or a group of fields. Forms can be a single field or a complex, multi-step form with multiple fields per page, input validation, and a CAPTCHA.

Forms are considered one of the most difficult elements to get right from an accessibility perspective, as they require knowledge of all the elements we have already covered, as well as additional rules specific just to forms.

additional reference: https://web.dev/learn/forms

### Fields

The backbone of forms is fields. Fields are small interactive patterns, such as an input or radio button element, that allow users to enter content or make a choice. There is a wide variety of form fields to choose from.

The default recommendation is to use established HTML patterns instead of building something custom with ARIA, as certain features and functions—such as field states, properties, and values—are inherently built into the HTML elements. Custom fields require you manually add the ARIA.

```
DONT!
<div role="form" id="sundae-order-form">
  <!-- form content -->
</div>

DO
<form id="sundae-order-form">
  <!-- form content -->
</form>
```

In addition to choosing the most accessible form field patterns, where applicable, you should also add HTML autocomplete attributes to your fields. Adding autocomplete attributes allows a more fine-grained definition or identification of purpose to user agents and assistive technologies (AT).

Autocomplete attributes allow users to personalize visual presentations, such as showing a birthday cake icon in a field with the birthday autocomplete attribute (bday) assigned to it. More generally, autocomplete attributes make filling out forms easier and quicker. This is especially helpful for people with cognitive and reading disorders and those using ATs, such as screen readers.

```
<form id="sundae-order-form">
  <p>Name: <input type="name" autocomplete="name"></p>
  <p>Telephone: <input type="tel" autocomplete="tel"></p>
  <p>Email address: <input type="email" autocomplete="email"></p>
</form>
```

Lastly, form fields shouldn't produce contextual changes when they receive focus or user input unless the user has been warned about the behavior before using the component. For example, a form shouldn't be automatically submitted when a field receives focus or once a user adds content to the field.

### Labels

Labels inform a user about the purpose of a field, if the field is required, and can also provide information about the field requirements, such as input format. Labels must be visible at all times and accurately describe the form field to users.

One of the foundational tenets of accessible forms is establishing a clear and accurate connection between a field and its label. This is true both visually and programmatically. Without this context, a user might not understand how to fill out the fields in the form.

```
<form id="sundae-order-form">
  <p><label>Name (required): <input type="name" autocomplete="name" required></label></p>
  <p><label>Telephone (required): <input type="tel" autocomplete="tel" required></label></p>
  <p><label>Email address: <input type="email" autocomplete="email"></label></p>
</form>
```

Additionally, related form fields, such as a mailing address, need to be programmatically and visually grouped. One method is to use the `fieldset` and `legend` pattern to group elements that are similar.

```
<form id="sundae-order-form">
  <h2>Online Sundae Order Form</h2>
  <fieldset>
    <legend>Customer Info</legend>
    <p><label>Name: <input type=name></label></p>
    <p><label>Telephone: <input type=tel></label></p>
    <p><label>Email address: <input type=email></label></p>
  </fieldset>

  <fieldset>
    <legend>Size</legend>
    <p><label><input type=radio name=size value="small">Small</label></p>
    <p><label><input type=radio name=size value="medium">Medium</label></p>
    <p><label><input type=radio name=size value="large">Large</label></p>
  </fieldset>

  <fieldset>
    <legend>Toppings</legend>
    <p><label><input type=checkbox name=topping value="whipped-cream">Whipped cream</label></p>
    <p><label><input type=checkbox name=topping value="cherry">Cherry</label></p>
    <p><label><input type=checkbox name=topping value="nuts">Nuts</label></p>
    <p><label><input type=checkbox name=topping value="caramel-sauce">Caramel sauce</label></p>
    <p><label><input type=checkbox name=topping value="chocolate-sauce">Chocolate sauce</label></p>
  </fieldset>
  <p><label>Delivery instructions: </label><br><textarea name="comments"></textarea></p>
  <p><button>Submit order</button></p>
</form>
```

### Descriptions

Field descriptions are similar to labels in purpose in that they are used to give more context to the field and requirements. Field descriptions are not required for accessibility if the labels or form instructions are descriptive enough.

However, there are situations in which adding additional information is useful to avoid form errors, such as relaying information about the minimum length of input for a password field or telling a user which calendar format to use (such as MM-DD-YYYY).

There are many different methods you can use to add field descriptions to your forms. One of the best methods is to add an `aria-describedby` attribute to the form element, in addition to a `<label>` element. The screen reader will read both the description and the label.

If you add the `aria-labelledby` attribute to your element, the attribute value overrides the text within your `<label>`. As always, test the final code with all of the ATs you intend to support.

```
<form id="sundae-order-form">
  <h2>Online Sundae Order Form</h2>
  <fieldset>
    <legend>Customer Info</legend>
    <p><label>Name (required): <input type=name required aria-describedby="name-validation"><br>
        <span id="name-validation" class="validation-message">Please provide your full name</span></label></p>
    <p><label>Telephone (required): <input type=tel required aria-describedby="tel-validation"><br>
        <span id="tel-validation" class="validation-message">Please provide an area code and use the format XXX-XXX-XXXX</span></label></p>
    <p><label>Email address (required): <input type=email required aria-describedby="email-validation"><br>
        <span id="email-validation" class="validation-message">Please provide a valid email address using the format name@place.com</span></label></p>
  </fieldset>

  <fieldset>
    <legend>Size</legend>
    <p><label><input type=radio name=size value="small">Small</label></p>
    <p><label><input type=radio name=size value="medium">Medium</label></p>
    <p><label><input type=radio name=size value="large">Large</label></p>
  </fieldset>

  <fieldset>
    <legend>Toppings</legend>
    <p><label><input type=checkbox name=topping value="whipped-cream">Whipped cream</label></p>
    <p><label><input type=checkbox name=topping value="cherry">Cherry</label></p>
    <p><label><input type=checkbox name=topping value="nuts">Nuts</label></p>
    <p><label><input type=checkbox name=topping value="caramel-sauce">Caramel sauce</label></p>
    <p><label><input type=checkbox name=topping value="chocolate-sauce">Chocolate sauce</label></p>
  </fieldset>
  <p><label>Delivery instructions: </label><br><textarea name="comments"></textarea></p>
  <p><button>Submit order</button></p>
</form>
```

### Errors

When a user encounters a form error, the first step is to `make the error known`. The field where the error occurred must be clearly identified, and the error itself must be described to the user in text.

There are different methods for displaying error messages, such as:

- A modal, inline near where the error occurred
- A collection of errors grouped in one larger message at the top of the page

Be sure to pay attention to the `keyboard focus and ARIA live region` options when announcing errors.

Whenever possible, offer the user a detailed suggestion on how to fix the error. There are two attributes available to notify users of errors.

- You can use the HTML `required` attribute. The browser supplies a generic error message based on the file validation parameters.
- Or you can use the `aria-required` attribute to share a customized error message to ATs. Only ATs receive this message, unless you add code to make the message visible to all users.

Once a user thinks all of the errors have been resolved, allow them to resubmit the form and provide feedback about the results of their submission. An error message tells a user they have more updates to make, while a success message confirms that they have resolved all errors and successfully submitted the form.

### Additional success criteria

WCAG 2.2 introduced the following success criteria that focus on more accessible form experiences:

- Target Size (Minimum) https://www.w3.org/TR/WCAG22/#target-size-minimum
- Consistent Help https://www.w3.org/TR/WCAG22/#consistent-help
- Accessible Authentication https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum
- Redundant Entry https://www.w3.org/TR/WCAG22/#redundant-entry

## Patterns, components, and design systems

Choosing an accessible pattern, component, or design system is not rocket science, but it does take time and critical thinking. In fact, there's no such thing as "one perfect pattern," but there may potentially be many options that could work. It's about learning to choose the best option for your unique situation.

In the subsequent testing modules, you'll read more about the techniques and methods on how to evaluate patterns, components, and design systems for accessibility. Before you get there, you need to ask yourself some fundamental questions, such as:

- Does an established accessible pattern, component, or design system already exist?
- What browsers and assistive technology (AT) am I supporting?
- Are there any code or framework limitations? Are there other integrations, factors, or user needs I should to consider?

Depending on your dev environment and user needs, you may have additional or different questions from these. Consider these questions as your starting point in your accessibility evaluation.

Some great resources for accessible patterns, components, and design systems include:

- Accessible Components https://github.com/scottaohara/accessible_components
- Deque University ARIA library https://dequeuniversity.com/library
- Gov.UK Design System https://design-system.service.gov.uk/components/
- Inclusive Components https://inclusive-components.design/

### Browsers and assistive technology (AT) support

After researching a few base patterns, components, or a full design system that might work for your dev environment, you can move on to assistive technology support. One major type of AT you will want to focus on when evaluating patterns, components, and design systems is screen readers.

Screen readers were built with specific browsers in mind and work best when paired with these browsers. We'll go into this topic in much more detail in the module on AT testing, but for pattern evaluation purposes, it's helpful to understand these combinations exist, so you know what you need in terms of support.

see https://web.dev/learn/accessibility/patterns#browsers_and_assistive_technology_at_support

## Design and user experience

### Inclusive design

How can we address all of the potential user needs at once? Enter inclusive design. Inclusive design utilizes a human-centered approach that weaves together inclusivity, usability, and accessibility into one.

And unlike universal design, which focuses on a single design that as many people can use as possible, inclusive design principles center on designing for a specific individual or use case, and then extending that design to others.

Accessibility + Inclusivity + Usability = Inclusive Design

There are seven accessibility-focused inclusive design principles:

- Provide comparable experience: Ensure your interface provides an equal experience for all, so people can accomplish tasks in a way that suits their needs without undermining the quality of the content.
- Consider the situation: Make sure your interface delivers a valuable experience to people, regardless of their circumstances.
- Be consistent: Use familiar conventions and apply them in a logical manner.
- Give control: Ensure people can access and interact with content in their preferred way.
- Offer choice: Consider providing different ways for people to complete tasks, especially those that are complex or non-standard.
- Prioritize content: Help users focus on core tasks, features, and information by arranging these elements in the preferred order within the content and layout.
- Add value: Consider the purpose and significance of features and how they improve the experience for different users.

### Personas

When developing a new design or feature, many teams rely on user personas to guide them through the process. Personas are fictitious characters that use your digital products, often based on quantitative and qualitative user research.

Personas also offer a quick and inexpensive way to test and prioritize those features throughout the design and development process. They help to focus decisions surrounding site components by adding a layer of real-world consideration to the conversation to help align strategy and create goals focused on specific user groups.

### Disability simulators

Use extreme caution when using disability simulators to emulate or supplement your personas.

Disability simulators are a double-edged sword in that they can build sympathy or empathy—it can depend on the individual, the context in which the simulator is used, and many other uncontrollable factors.

### Accessibility Heuristics

Consider adding heuristics into your workflow as you build your personas and designs. Heuristics are rules for interaction design, introduced in 1990 by Jakob Nielsen and Rolf Molich. These ten principles were developed based on years of experience in the field of usability engineering, and have been used in design and human-computer interaction programs ever since.

Fast-forward to 2019, and the design team at Deque created and shared a new set of heuristics focused on digital accessibility. According to their research, up to 67% of all accessibility bugs for a website or app can be avoided when accessibility is part of the design process. That's a huge impact that can be made before even one line of code is written.

https://web.dev/learn/accessibility/design-ux?#accessibility_heuristics

### Accessibility annotations

Before you hand off your design to the development team, you should consider adding accessibility annotations.

Annotations, in general, are used to explain creative choices and describe different aspects of the design. Accessibility annotations focus on areas where developers can make more accessible programmatic choices with the guidance of the design team or an accessibility-focused specialist.

Accessibility annotations can be applied during any stage of the design process, from wireframes to high-fidelity mockups. They can include user flows, conditional states, and functionality. They often use symbols and labels to streamline the process and keep the design as the main focus.

see https://web.dev/learn/accessibility/design-ux#accessibility_annotations

## Automated accessibility testing

Automated accessibility testing uses software to scan your digital product for accessibility issues against predefined accessibility conformance standards.

Advantages of automated accessibility tests:

- Quickly repeat tests at different stages of the product lifecycle.
- Just a few steps to run and very quick results.
- Little accessibility knowledge is required to run the tests or understand the results.

Disadvantages of automated accessibility tests:

- Automated tools don't catch all of the accessibility errors in your product
- Reported false positives (an issue is reported that isn't a true WCAG violation)
- Multiple tools may be needed for different product types and roles

Automated testing is a great first step to check your website or app for accessibility, but not all checks can be automated.

See example using Lighthouse https://web.dev/learn/accessibility/test-automated#demo_automated_test

Also see using Playwright and Axe - https://playwright.dev/docs/accessibility-testing

## Manual accessibility testing

Manual accessibility testing uses keyboard, visual, and cognitive tests, tools, and techniques to find issues that automated tooling cannot. As automated tooling doesn't cover all of the success criteria identified in WCAG, it's vital that you run automated accessibility tests and keep testing!

As technology advances, more tests could be covered by automated tooling alone, but today, both manual and assistive technology checks need to be added to your testing protocols to cover all of the applicable WCAG checkpoints.

Benefits of manual accessibility tests:

- Reasonably straightforward and quick to run
- Catch a higher percentage of issues than automated tests alone
- Little tooling and expertise needed for success

Disadvantages of manual accessibility tests:

- More complex and time-consuming than automated tests
- May be difficult to repeat at scale
- Require more accessibility expertise to run tests and interpret the results

### Types of manual tests

There are many manual tools and techniques to consider when looking at your web page or app for digital accessibility. The three biggest focus areas in manual testing are keyboard functionality, visually-focused reviews, and general content checks.

see for more info https://web.dev/learn/accessibility/test-manual#types_of_manual_tests

Also see https://accessibilityinsights.io/docs/web/overview/?referrer=playwright-accessibility-testing-js

### Assistive technology testing

In the digital space, ATs can be:

- No or low-tech: head and mouth sticks, hand-held magnifiers, devices with large buttons
- High-tech: voice-activated devices, eye-tracking devices, adaptive keyboards and mice
- Hardware: switch buttons, ergonomic keyboards, auto-refreshing Braille device
- Software: text-to-speech programs, live captions, screen readers

We encourage you to use multiple types of ATs in your overall testing workflow.

https://web.dev/learn/accessibility/test-assistive-technology#screen_reader_testing_basics

Example VoiceOver for Mac https://support.apple.com/en-gb/guide/voiceover-guide/welcome/web

## Additional Resources

https://web.dev/learn/accessibility/conclusion#additional_resources

## References

https://web.dev/learn/accessibility
