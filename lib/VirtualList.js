'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _getVisibleItemBounds = require('./utils/getVisibleItemBounds');

var _getVisibleItemBounds2 = _interopRequireDefault(_getVisibleItemBounds);

var _throttleWithRAF = require('./utils/throttleWithRAF');

var _throttleWithRAF2 = _interopRequireDefault(_throttleWithRAF);

var _handleActions2 = require('@f/handle-actions');

var _handleActions3 = _interopRequireDefault(_handleActions2);

var _createAction = require('@f/create-action');

var _createAction2 = _interopRequireDefault(_createAction);

var _element = require('vdux/element');

var _element2 = _interopRequireDefault(_element);

var _Window = require('vdux/Window');

var _Window2 = _interopRequireDefault(_Window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var setNewBounds = (0, _createAction2.default)('<VirtualList/>: SET_NEW_BOUNDS');

var VirtualList = function VirtualList(options) {
  return {
    initialState: function initialState(_ref) {
      var props = _ref.props,
          local = _ref.local;

      return {
        options: _extends({
          container: typeof window !== 'undefined' ? window : undefined
        }, options),
        firstItemIndex: 0,
        lastItemIndex: -1,
        domNode: window,
        actions: {
          setNewBounds: local(setNewBounds)
        }
      };
    },
    onCreate: regeneratorRuntime.mark(function onCreate(_ref2) {
      var props = _ref2.props,
          state = _ref2.state;
      var itemHeight, items, itemBuffer;
      return regeneratorRuntime.wrap(function onCreate$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              itemHeight = props.itemHeight, items = props.items, itemBuffer = props.itemBuffer;
              _context.next = 3;
              return state.actions.setNewBounds((0, _getVisibleItemBounds2.default)(state.domNode, state.options.container, items, itemHeight, itemBuffer));

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, onCreate, this);
    }),


    // if props change, just assume we have to recalculate
    // * onUpdate (prevProps, {props, state}) {
    //   const { itemHeight, items, itemBuffer } = props
    //   console.log(itemHeight, items, itemBuffer)
    //   yield state.actions.setNewBounds(getVisibleItemBounds(state.domNode, state.options.container, items, itemHeight, itemBuffer))
    // },

    reducer: (0, _handleActions3.default)(_defineProperty({}, setNewBounds.type, function (state, payload) {
      return _extends({}, state, payload);
    })),

    render: function render(_ref3) {
      var _marked = [refreshState].map(regeneratorRuntime.mark);

      var props = _ref3.props,
          state = _ref3.state;
      var firstItemIndex = state.firstItemIndex,
          lastItemIndex = state.lastItemIndex;
      var items = props.items,
          itemHeight = props.itemHeight,
          InnerComponent = props.InnerComponent;


      var visibleItems = lastItemIndex > -1 ? items.slice(firstItemIndex, lastItemIndex + 1) : [];

      // would be nice to make this not break shallowCompare with items.slice
      // but theoretically we're only rendering if we need to

      // style
      var height = items.length * itemHeight;
      var paddingTop = firstItemIndex * itemHeight;

      var virtual = {
        items: visibleItems,
        style: {
          height: height,
          paddingTop: paddingTop,
          maxHeight: height,
          boxSizing: 'border-box'
        }
      };

      return (0, _element2.default)(
        _Window2.default,
        { onScroll: refreshState, onResize: refreshState },
        (0, _element2.default)(
          'div',
          { id: 'virtual-list-container' },
          (0, _element2.default)(InnerComponent, _extends({
            virtual: virtual
          }, this.props))
        )
      );

      function refreshState(e) {
        var itemHeight, items, itemBuffer, domNode;
        return regeneratorRuntime.wrap(function refreshState$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                itemHeight = props.itemHeight, items = props.items, itemBuffer = props.itemBuffer;
                domNode = document.getElementById('virtual-list-container');
                _context2.next = 4;
                return state.actions.setNewBounds((0, _getVisibleItemBounds2.default)(domNode, state.options.container, items, itemHeight, itemBuffer));

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _marked[0], this);
      }
    }
  };
};

exports.default = VirtualList;