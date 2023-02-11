/**
 * NOTE TO DEVS:
 *
 * Spacing should be consistent and whitespace thought of as a first class technique up
 * there with color and typefaces.
 *
 * Which type of scale you use is based on the design.
 *
 * If you've got simpler app, you may only need 6 items.  Or maybe you want a spacing scale
 * to be named:
 *
 * export const spacing = {
 *   tiny: 4,
 *   small: 8,
 *   medium: 12,
 *   large: 24,
 *   huge: 64
 * }
 *
 * Whatever you choose, try to stick with these, and not freestyle it everywhere.
 *
 * Feel free to delete this block.
 */

/**
 * The available spacing.
 *
 * Here's the rough guideline.  Customize this for you usage.  It's ok to put exceptions
 * within the components themselves if they are truly exceptions.
 */
export const spacing = {
  none: 0, // nothing. only here to bust out of a zero-based array.
  tiny: 4, // elements contextually close to each other
  smaller: 8, // for groups of closely related items or perhaps borders
  small: 12,
  medium: 16,
  mediumPlus: 24,
  large: 32, // between groups of content that aren't related?
  huge: 48,
  massive: 64, //an uncomfortable amount of whitespace
}
