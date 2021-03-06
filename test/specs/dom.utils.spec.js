import * as utils from '../../src/utils/dom.utils'
import $ from 'jquery'

describe('dom.utils', () => {
  describe('#isElement', () => {
    it('should be able to check Element', () => {
      expect(!!utils.isElement(document.createElement('div'))).to.be.true
      expect(!!utils.isElement(null)).to.be.false
      expect(!!utils.isElement(undefined)).to.be.false
    })
  })

  describe('#removeFromDom', () => {
    it('should be able to handle `removeFromDom` with null', () => {
      utils.removeFromDom(null)
    })
  })

  describe('#addClass', () => {
    it('should be able to handle `addClass` with null', () => {
      utils.addClass(null, 'active')
    })

    it('should be able to add class', () => {
      const div = document.createElement('div')
      utils.addClass(div, 'c1')
      expect(div.className).to.equal('c1')
      utils.addClass(div, 'c2')
      expect(div.className).to.equal('c1 c2')
      utils.addClass(div, 'c2')
      expect(div.className).to.equal('c1 c2')
    })
  })

  describe('#removeClass', () => {
    it('should be able to handle `removeClass` with null', () => {
      utils.removeClass(null, 'active')
    })

    it('should be able to remove class', () => {
      const div = document.createElement('div')
      utils.removeClass(div, 'c1')
      utils.addClass(div, 'c1')
      utils.addClass(div, 'c2')
      utils.removeClass(div, 'c1')
      expect(div.className).to.equal('c2')
      utils.removeClass(div, 'c2')
      expect(div.className).to.equal('')
    })
  })

  describe('#hasClass', () => {
    it('should be able to handle `hasClass` with null', () => {
      utils.hasClass(null, 'active')
    })

    it('should be able to check class', () => {
      const div = document.createElement('div')
      utils.addClass(div, 'c1')
      utils.addClass(div, 'c2')
      expect(utils.hasClass(div, 'c1')).to.be.true
      expect(utils.hasClass(div, 'c2')).to.be.true
      utils.removeClass(div, 'c2')
      expect(utils.hasClass(div, 'c1')).to.be.true
      expect(utils.hasClass(div, 'c2')).to.be.false
      utils.removeClass(div, 'c1')
      expect(utils.hasClass(div, 'c1')).to.be.false
      expect(utils.hasClass(div, 'c2')).to.be.false
    })
  })

  describe('#toggleBodyOverflow', () => {
    it('should be able to use `toggleBodyOverflow` with `enable = true`', () => {
      utils.toggleBodyOverflow(true)
      expect(document.body.style.paddingRight).to.equal('')
    })

    it('should be able to use `toggleBodyOverflow` with `enable = false`', () => {
      const $body = $('html, body')
      $body.css('height', '9999px')
      utils.toggleBodyOverflow(false)
      expect(document.body.style.paddingRight).to.contain(`px`)
      utils.toggleBodyOverflow(true)
      $body.css('height', '')
    })
  })

  describe('#getScrollbarWidth', () => {
    it('should be able to use `getScrollbarWidth` with `recalculate = false`', () => {
      const width = utils.getScrollbarWidth(false)
      expect(width).to.above(0)
    })

    it('should be able to use `getScrollbarWidth` with `recalculate = true`', () => {
      const width = utils.getScrollbarWidth(true)
      expect(width).to.above(0)
    })
  })

  describe('#getClosest', () => {
    it('should be able to handle null input', () => {
      expect(utils.getClosest(null)).to.be.null
    })
  })
})
