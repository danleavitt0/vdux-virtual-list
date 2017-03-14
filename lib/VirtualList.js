'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getVisibleItemBounds = require('./utils/getVisibleItemBounds');

var _getVisibleItemBounds2 = _interopRequireDefault(_getVisibleItemBounds);

var _throttleWithRAF = require('./utils/throttleWithRAF');

var _throttleWithRAF2 = _interopRequireDefault(_throttleWithRAF);

var _handleActions = require('@f/handle-actions');

var _handleActions2 = _interopRequireDefault(_handleActions);

var _createAction = require('@f/create-action');

var _createAction2 = _interopRequireDefault(_createAction);

var _vdux = require('vdux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VirtualList = function VirtualList(options) {
  return (0, _vdux.component)({
    initialState: function initialState(_ref) {
      var props = _ref.props;

      return {
        options: (0, _extends3.default)({
          container: typeof window !== 'undefined' ? window : undefined
        }, options),
        firstItemIndex: 0,
        lastItemIndex: -1,
        domNode: window
      };
    },
    onCreate: _regenerator2.default.mark(function onCreate(_ref2) {
      var props = _ref2.props,
          state = _ref2.state,
          actions = _ref2.actions;
      var itemHeight, items, itemBuffer;
      return _regenerator2.default.wrap(function onCreate$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              itemHeight = props.itemHeight, items = props.items, itemBuffer = props.itemBuffer;

              console.log((0, _getVisibleItemBounds2.default)(state.domNode, state.options.container, items, itemHeight, itemBuffer));
              _context.next = 4;
              return actions.setNewBounds((0, _getVisibleItemBounds2.default)(state.domNode, state.options.container, items, itemHeight, itemBuffer));

            case 4:
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

    reducer: {
      setNewBounds: function setNewBounds(state, payload) {
        console.log(payload);return (0, _extends3.default)({}, payload);
      }
    },

    render: function render(_ref3) {
      var props = _ref3.props,
          state = _ref3.state,
          actions = _ref3.actions,
          context = _ref3.context;
      var firstItemIndex = state.firstItemIndex,
          lastItemIndex = state.lastItemIndex;
      var items = props.items,
          itemHeight = props.itemHeight,
          InnerComponent = props.InnerComponent;


      console.log(firstItemIndex, lastItemIndex);

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

      return (0, _vdux.element)(
        _vdux.Window,
        { onScroll: actions.refreshState(), onResize: actions.refreshState() },
        (0, _vdux.element)(
          'div',
          { id: 'virtual-list-container' },
          (0, _vdux.element)(InnerComponent, (0, _extends3.default)({
            virtual: virtual
          }, this.props))
        )
      );
    },


    controller: {
      refreshState: _regenerator2.default.mark(function refreshState(_ref4) {
        var props = _ref4.props,
            actions = _ref4.actions,
            state = _ref4.state;
        var itemHeight, items, itemBuffer, domNode;
        return _regenerator2.default.wrap(function refreshState$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                itemHeight = props.itemHeight, items = props.items, itemBuffer = props.itemBuffer;
                domNode = document.getElementById('virtual-list-container');

                console.log((0, _getVisibleItemBounds2.default)(domNode, state.options.container, items, itemHeight, itemBuffer));
                _context2.next = 5;
                return actions.setNewBounds((0, _getVisibleItemBounds2.default)(domNode, state.options.container, items, itemHeight, itemBuffer));

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, refreshState, this);
      })
    }
  });
};

exports.default = VirtualList;