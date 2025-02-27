import {
  mermaid,
  require_dayjs_min,
  require_dist,
  require_purify
} from "./chunk-AFFLXUXG.js";
import {
  init_define_import_meta_env
} from "./chunk-YRUDZAGT.js";
import {
  __commonJS,
  __toESM
} from "./chunk-F3UQABQJ.js";

// ../../node_modules/@excalidraw/markdown-to-text/dist/index.js
var require_dist2 = __commonJS({
  "../../node_modules/@excalidraw/markdown-to-text/dist/index.js"(exports) {
    "use strict";
    init_define_import_meta_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.removeMarkdown = void 0;
    var removeMarkdown2 = function(markdown, options) {
      if (options === void 0) {
        options = {
          listUnicodeChar: ""
        };
      }
      options = options || {};
      options.listUnicodeChar = options.hasOwnProperty("listUnicodeChar") ? options.listUnicodeChar : false;
      options.stripListLeaders = options.hasOwnProperty("stripListLeaders") ? options.stripListLeaders : true;
      options.gfm = options.hasOwnProperty("gfm") ? options.gfm : true;
      options.useImgAltText = options.hasOwnProperty("useImgAltText") ? options.useImgAltText : true;
      options.preserveLinks = options.hasOwnProperty("preserveLinks") ? options.preserveLinks : false;
      var output = markdown || "";
      output = output.replace(/^(-\s*?|\*\s*?|_\s*?){3,}\s*$/gm, "");
      try {
        if (options.stripListLeaders) {
          if (options.listUnicodeChar)
            output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, options.listUnicodeChar + " $1");
          else
            output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, "$1");
        }
        if (options.gfm) {
          output = output.replace(/\n={2,}/g, "\n").replace(/~{3}.*\n/g, "").replace(/~~/g, "").replace(/`{3}.*\n/g, "");
        }
        if (options.preserveLinks) {
          output = output.replace(/\[(.*?)\][\[\(](.*?)[\]\)]/g, "$1 ($2)");
        }
        output = output.replace(/<[^>]*>/g, "").replace(/^[=\-]{2,}\s*$/g, "").replace(/\[\^.+?\](\: .*?$)?/g, "").replace(/\s{0,2}\[.*?\]: .*?$/g, "").replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, options.useImgAltText ? "$1" : "").replace(/\[(.*?)\][\[\(].*?[\]\)]/g, "$1").replace(/^\s{0,3}>\s?/g, "").replace(/(^|\n)\s{0,3}>\s?/g, "\n\n").replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, "").replace(/^(\n)?\s{0,}#{1,6}\s+| {0,}(\n)?\s{0,}#{0,} {0,}(\n)?\s{0,}$/gm, "$1$2$3").replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, "$2").replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, "$2").replace(/(`{3,})(.*?)\1/gm, "$2").replace(/`(.+?)`/g, "$1").replace(/\n{2,}/g, "\n\n");
      } catch (e) {
        console.error(e);
        return markdown;
      }
      return output;
    };
    exports.removeMarkdown = removeMarkdown2;
  }
});

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/index.js
init_define_import_meta_env();

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/graphToExcalidraw.js
init_define_import_meta_env();

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/converter/types/flowchart.js
init_define_import_meta_env();

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/converter/GraphConverter.js
init_define_import_meta_env();

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/constants.js
init_define_import_meta_env();
var DEFAULT_FONT_SIZE = 20;
var SVG_TO_SHAPE_MAPPER = {
  rect: "rectangle",
  circle: "ellipse"
};
var MERMAID_CONFIG = {
  startOnLoad: false,
  flowchart: { curve: "linear" },
  themeVariables: {
    fontSize: `${DEFAULT_FONT_SIZE * 1.25}px`
  }
};

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/converter/GraphConverter.js
var GraphConverter = class {
  constructor({ converter }) {
    this.convert = (graph, options) => {
      return this.converter(graph, {
        ...options,
        fontSize: options.fontSize || DEFAULT_FONT_SIZE
      });
    };
    this.converter = converter;
  }
};

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/converter/helpers.js
init_define_import_meta_env();

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/interfaces.js
init_define_import_meta_env();
var VERTEX_TYPE;
(function(VERTEX_TYPE2) {
  VERTEX_TYPE2["ROUND"] = "round";
  VERTEX_TYPE2["STADIUM"] = "stadium";
  VERTEX_TYPE2["DOUBLECIRCLE"] = "doublecircle";
  VERTEX_TYPE2["CIRCLE"] = "circle";
  VERTEX_TYPE2["DIAMOND"] = "diamond";
})(VERTEX_TYPE || (VERTEX_TYPE = {}));
var LABEL_STYLE_PROPERTY;
(function(LABEL_STYLE_PROPERTY2) {
  LABEL_STYLE_PROPERTY2["COLOR"] = "color";
})(LABEL_STYLE_PROPERTY || (LABEL_STYLE_PROPERTY = {}));
var CONTAINER_STYLE_PROPERTY;
(function(CONTAINER_STYLE_PROPERTY2) {
  CONTAINER_STYLE_PROPERTY2["FILL"] = "fill";
  CONTAINER_STYLE_PROPERTY2["STROKE"] = "stroke";
  CONTAINER_STYLE_PROPERTY2["STROKE_WIDTH"] = "stroke-width";
  CONTAINER_STYLE_PROPERTY2["STROKE_DASHARRAY"] = "stroke-dasharray";
})(CONTAINER_STYLE_PROPERTY || (CONTAINER_STYLE_PROPERTY = {}));

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/converter/helpers.js
var import_markdown_to_text = __toESM(require_dist2(), 1);
var MERMAID_EDGE_TYPE_MAPPER = {
  arrow_circle: {
    endArrowhead: "dot"
  },
  arrow_cross: {
    endArrowhead: "bar"
  },
  double_arrow_circle: {
    endArrowhead: "dot",
    startArrowhead: "dot"
  },
  double_arrow_cross: {
    endArrowhead: "bar",
    startArrowhead: "bar"
  },
  double_arrow_point: {
    endArrowhead: "arrow",
    startArrowhead: "arrow"
  }
};
var computeExcalidrawArrowType = (mermaidArrowType) => {
  return MERMAID_EDGE_TYPE_MAPPER[mermaidArrowType];
};
var getText = (element) => {
  let text = element.text;
  if (element.labelType === "markdown") {
    text = (0, import_markdown_to_text.removeMarkdown)(element.text);
  }
  return removeFontAwesomeIcons(text);
};
var removeFontAwesomeIcons = (input) => {
  const fontAwesomeRegex = /\s?(fa|fab):[a-zA-Z0-9-]+/g;
  return input.replace(fontAwesomeRegex, "");
};
var computeExcalidrawVertexStyle = (style) => {
  const excalidrawProperty = {};
  Object.keys(style).forEach((property) => {
    switch (property) {
      case CONTAINER_STYLE_PROPERTY.FILL: {
        excalidrawProperty.backgroundColor = style[property];
        excalidrawProperty.fillStyle = "solid";
        break;
      }
      case CONTAINER_STYLE_PROPERTY.STROKE: {
        excalidrawProperty.strokeColor = style[property];
        break;
      }
      case CONTAINER_STYLE_PROPERTY.STROKE_WIDTH: {
        excalidrawProperty.strokeWidth = Number(style[property]?.split("px")[0]);
        break;
      }
      case CONTAINER_STYLE_PROPERTY.STROKE_DASHARRAY: {
        excalidrawProperty.strokeStyle = "dashed";
        break;
      }
    }
  });
  return excalidrawProperty;
};
var computeExcalidrawVertexLabelStyle = (style) => {
  const excalidrawProperty = {};
  Object.keys(style).forEach((property) => {
    switch (property) {
      case LABEL_STYLE_PROPERTY.COLOR: {
        excalidrawProperty.strokeColor = style[property];
        break;
      }
    }
  });
  return excalidrawProperty;
};

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/converter/types/flowchart.js
var computeGroupIds = (graph) => {
  const tree = {};
  graph.subGraphs.map((subGraph) => {
    subGraph.nodeIds.forEach((nodeId) => {
      tree[subGraph.id] = {
        id: subGraph.id,
        parent: null,
        isLeaf: false
      };
      tree[nodeId] = {
        id: nodeId,
        parent: subGraph.id,
        isLeaf: graph.vertices[nodeId] !== void 0
      };
    });
  });
  const mapper = {};
  [...Object.keys(graph.vertices), ...graph.subGraphs.map((c) => c.id)].forEach((id) => {
    if (!tree[id]) {
      return;
    }
    let curr = tree[id];
    const groupIds = [];
    if (!curr.isLeaf) {
      groupIds.push(`subgraph_group_${curr.id}`);
    }
    while (true) {
      if (curr.parent) {
        groupIds.push(`subgraph_group_${curr.parent}`);
        curr = tree[curr.parent];
      } else {
        break;
      }
    }
    mapper[id] = groupIds;
  });
  return {
    getGroupIds: (elementId) => {
      return mapper[elementId] || [];
    },
    getParentId: (elementId) => {
      return tree[elementId] ? tree[elementId].parent : null;
    }
  };
};
var FlowchartToExcalidrawSkeletonConverter = new GraphConverter({
  converter: (graph, options) => {
    const elements = [];
    const fontSize = options.fontSize;
    const { getGroupIds, getParentId } = computeGroupIds(graph);
    graph.subGraphs.reverse().forEach((subGraph) => {
      const groupIds = getGroupIds(subGraph.id);
      const containerElement = {
        id: subGraph.id,
        type: "rectangle",
        groupIds,
        x: subGraph.x,
        y: subGraph.y,
        width: subGraph.width,
        height: subGraph.height,
        label: {
          groupIds,
          text: getText(subGraph),
          fontSize,
          verticalAlign: "top"
        }
      };
      elements.push(containerElement);
    });
    Object.values(graph.vertices).forEach((vertex) => {
      if (!vertex) {
        return;
      }
      const groupIds = getGroupIds(vertex.id);
      const containerStyle = computeExcalidrawVertexStyle(vertex.containerStyle);
      const labelStyle = computeExcalidrawVertexLabelStyle(vertex.labelStyle);
      let containerElement = {
        id: vertex.id,
        type: "rectangle",
        groupIds,
        x: vertex.x,
        y: vertex.y,
        width: vertex.width,
        height: vertex.height,
        strokeWidth: 2,
        label: {
          groupIds,
          text: getText(vertex),
          fontSize,
          ...labelStyle
        },
        link: vertex.link || null,
        ...containerStyle
      };
      switch (vertex.type) {
        case VERTEX_TYPE.STADIUM: {
          containerElement = { ...containerElement, roundness: { type: 3 } };
          break;
        }
        case VERTEX_TYPE.ROUND: {
          containerElement = { ...containerElement, roundness: { type: 3 } };
          break;
        }
        case VERTEX_TYPE.DOUBLECIRCLE: {
          const CIRCLE_MARGIN = 5;
          groupIds.push(`doublecircle_${vertex.id}}`);
          const innerCircle = {
            type: "ellipse",
            groupIds,
            x: vertex.x + CIRCLE_MARGIN,
            y: vertex.y + CIRCLE_MARGIN,
            width: vertex.width - CIRCLE_MARGIN * 2,
            height: vertex.height - CIRCLE_MARGIN * 2,
            strokeWidth: 2,
            roundness: { type: 3 },
            label: {
              groupIds,
              text: getText(vertex),
              fontSize
            }
          };
          containerElement = { ...containerElement, groupIds, type: "ellipse" };
          elements.push(innerCircle);
          break;
        }
        case VERTEX_TYPE.CIRCLE: {
          containerElement.type = "ellipse";
          break;
        }
        case VERTEX_TYPE.DIAMOND: {
          containerElement.type = "diamond";
          break;
        }
      }
      elements.push(containerElement);
    });
    graph.edges.forEach((edge) => {
      let groupIds = [];
      const startParentId = getParentId(edge.start);
      const endParentId = getParentId(edge.end);
      if (startParentId && startParentId === endParentId) {
        groupIds = getGroupIds(startParentId);
      }
      const { startX, startY, reflectionPoints } = edge;
      const points = reflectionPoints.map((point) => [
        point.x - reflectionPoints[0].x,
        point.y - reflectionPoints[0].y
      ]);
      const arrowType = computeExcalidrawArrowType(edge.type);
      const arrowId = `${edge.start}_${edge.end}`;
      const containerElement = {
        id: arrowId,
        type: "arrow",
        groupIds,
        x: startX,
        y: startY,
        // 4 and 2 are the Excalidraw's stroke width of thick and thin respectively
        // TODO: use constant exported from Excalidraw package
        strokeWidth: edge.stroke === "thick" ? 4 : 2,
        strokeStyle: edge.stroke === "dotted" ? "dashed" : void 0,
        points,
        ...edge.text ? { label: { text: getText(edge), fontSize, groupIds } } : {},
        roundness: {
          type: 2
        },
        ...arrowType
      };
      const startVertex = elements.find((e) => e.id === edge.start);
      const endVertex = elements.find((e) => e.id === edge.end);
      if (!startVertex || !endVertex) {
        return;
      }
      containerElement.start = {
        id: startVertex.id || ""
      };
      containerElement.end = {
        id: endVertex.id || ""
      };
      elements.push(containerElement);
    });
    return {
      elements
    };
  }
});

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/converter/types/graphImage.js
init_define_import_meta_env();

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/node_modules/nanoid/index.browser.js
init_define_import_meta_env();
var nanoid = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
  byte &= 63;
  if (byte < 36) {
    id += byte.toString(36);
  } else if (byte < 62) {
    id += (byte - 26).toString(36).toUpperCase();
  } else if (byte > 62) {
    id += "-";
  } else {
    id += "_";
  }
  return id;
}, "");

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/converter/types/graphImage.js
var GraphImageConverter = new GraphConverter({
  converter: (graph) => {
    const imageId = nanoid();
    const { width, height } = graph;
    const imageElement = {
      type: "image",
      x: 0,
      y: 0,
      width,
      height,
      status: "saved",
      fileId: imageId
    };
    const files = {
      [imageId]: {
        id: imageId,
        mimeType: graph.mimeType,
        dataURL: graph.dataURL
      }
    };
    return { files, elements: [imageElement] };
  }
});

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/converter/types/sequence.js
init_define_import_meta_env();

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/converter/transformToExcalidrawSkeleton.js
init_define_import_meta_env();
var transformToExcalidrawLineSkeleton = (line) => {
  const lineElement = {
    type: "line",
    x: line.startX,
    y: line.startY,
    points: [
      [0, 0],
      [line.endX - line.startX, line.endY - line.startY]
    ],
    width: line.endX - line.startX,
    height: line.endY - line.startY,
    strokeStyle: line.strokeStyle || "solid",
    strokeColor: line.strokeColor || "#000",
    strokeWidth: line.strokeWidth || 1
  };
  if (line.groupId) {
    Object.assign(lineElement, { groupIds: [line.groupId] });
  }
  if (line.id) {
    Object.assign(lineElement, { id: line.id });
  }
  return lineElement;
};
var transformToExcalidrawTextSkeleton = (element) => {
  const textElement = {
    type: "text",
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height,
    text: element.text || "",
    fontSize: element.fontSize,
    verticalAlign: "middle"
  };
  if (element.groupId) {
    Object.assign(textElement, { groupIds: [element.groupId] });
  }
  if (element.id) {
    Object.assign(textElement, { id: element.id });
  }
  return textElement;
};
var transformToExcalidrawContainerSkeleton = (element) => {
  let extraProps = {};
  if (element.type === "rectangle" && element.subtype === "activation") {
    extraProps = {
      backgroundColor: "#e9ecef",
      fillStyle: "solid"
    };
  }
  const container = {
    id: element.id,
    type: element.type,
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height,
    label: {
      text: element?.label?.text || "",
      fontSize: element?.label?.fontSize,
      verticalAlign: element.label?.verticalAlign || "middle",
      strokeColor: element.label?.color || "#000",
      groupIds: element.groupId ? [element.groupId] : []
    },
    strokeStyle: element?.strokeStyle,
    strokeWidth: element?.strokeWidth,
    strokeColor: element?.strokeColor,
    backgroundColor: element?.bgColor,
    fillStyle: "solid",
    ...extraProps
  };
  if (element.groupId) {
    Object.assign(container, { groupIds: [element.groupId] });
  }
  return container;
};
var transformToExcalidrawArrowSkeleton = (arrow) => {
  const arrowElement = {
    type: "arrow",
    x: arrow.startX,
    y: arrow.startY,
    points: arrow.points || [
      [0, 0],
      [arrow.endX - arrow.startX, arrow.endY - arrow.startY]
    ],
    width: arrow.endX - arrow.startX,
    height: arrow.endY - arrow.startY,
    strokeStyle: arrow?.strokeStyle || "solid",
    endArrowhead: arrow?.endArrowhead || null,
    startArrowhead: arrow?.startArrowhead || null,
    label: {
      text: arrow?.label?.text || "",
      fontSize: 16
    },
    roundness: {
      type: 2
    },
    start: arrow.start,
    end: arrow.end
  };
  if (arrow.groupId) {
    Object.assign(arrowElement, { groupIds: [arrow.groupId] });
  }
  return arrowElement;
};

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/converter/types/sequence.js
var SequenceToExcalidrawSkeletonConvertor = new GraphConverter({
  converter: (chart) => {
    const elements = [];
    const activations = [];
    Object.values(chart.nodes).forEach((node) => {
      if (!node || !node.length) {
        return;
      }
      node.forEach((element) => {
        let excalidrawElement;
        switch (element.type) {
          case "line":
            excalidrawElement = transformToExcalidrawLineSkeleton(element);
            break;
          case "rectangle":
          case "ellipse":
            excalidrawElement = transformToExcalidrawContainerSkeleton(element);
            break;
          case "text":
            excalidrawElement = transformToExcalidrawTextSkeleton(element);
            break;
          default:
            throw `unknown type ${element.type}`;
            break;
        }
        if (element.type === "rectangle" && element?.subtype === "activation") {
          activations.push(excalidrawElement);
        } else {
          elements.push(excalidrawElement);
        }
      });
    });
    Object.values(chart.lines).forEach((line) => {
      if (!line) {
        return;
      }
      elements.push(transformToExcalidrawLineSkeleton(line));
    });
    Object.values(chart.arrows).forEach((arrow) => {
      if (!arrow) {
        return;
      }
      elements.push(transformToExcalidrawArrowSkeleton(arrow));
      if (arrow.sequenceNumber) {
        elements.push(transformToExcalidrawContainerSkeleton(arrow.sequenceNumber));
      }
    });
    elements.push(...activations);
    if (chart.loops) {
      const { lines, texts, nodes } = chart.loops;
      lines.forEach((line) => {
        elements.push(transformToExcalidrawLineSkeleton(line));
      });
      texts.forEach((text) => {
        elements.push(transformToExcalidrawTextSkeleton(text));
      });
      nodes.forEach((node) => {
        elements.push(transformToExcalidrawContainerSkeleton(node));
      });
    }
    if (chart.groups) {
      chart.groups.forEach((group) => {
        const { actorKeys, name } = group;
        let minX = Infinity;
        let minY = Infinity;
        let maxX = 0;
        let maxY = 0;
        if (!actorKeys.length) {
          return;
        }
        const actors = elements.filter((ele) => {
          if (ele.id) {
            const hyphenIndex = ele.id.indexOf("-");
            const id = ele.id.substring(0, hyphenIndex);
            return actorKeys.includes(id);
          }
        });
        actors.forEach((actor) => {
          if (actor.x === void 0 || actor.y === void 0 || actor.width === void 0 || actor.height === void 0) {
            throw new Error(`Actor attributes missing ${actor}`);
          }
          minX = Math.min(minX, actor.x);
          minY = Math.min(minY, actor.y);
          maxX = Math.max(maxX, actor.x + actor.width);
          maxY = Math.max(maxY, actor.y + actor.height);
        });
        const PADDING = 10;
        const groupRectX = minX - PADDING;
        const groupRectY = minY - PADDING;
        const groupRectWidth = maxX - minX + PADDING * 2;
        const groupRectHeight = maxY - minY + PADDING * 2;
        const groupRectId = nanoid();
        const groupRect = transformToExcalidrawContainerSkeleton({
          type: "rectangle",
          x: groupRectX,
          y: groupRectY,
          width: groupRectWidth,
          height: groupRectHeight,
          bgColor: group.fill,
          id: groupRectId
        });
        elements.unshift(groupRect);
        const frameId = nanoid();
        const frameChildren = [groupRectId];
        elements.forEach((ele) => {
          if (ele.type === "frame") {
            return;
          }
          if (ele.x === void 0 || ele.y === void 0 || ele.width === void 0 || ele.height === void 0) {
            throw new Error(`Element attributes missing ${ele}`);
          }
          if (ele.x >= minX && ele.x + ele.width <= maxX && ele.y >= minY && ele.y + ele.height <= maxY) {
            const elementId = ele.id || nanoid();
            if (!ele.id) {
              Object.assign(ele, { id: elementId });
            }
            frameChildren.push(elementId);
          }
        });
        const frame = {
          type: "frame",
          id: frameId,
          name,
          children: frameChildren
        };
        elements.push(frame);
      });
    }
    return { elements };
  }
});

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/converter/types/class.js
init_define_import_meta_env();
var classToExcalidrawSkeletonConvertor = new GraphConverter({
  converter: (chart) => {
    const elements = [];
    Object.values(chart.nodes).forEach((node) => {
      if (!node || !node.length) {
        return;
      }
      node.forEach((element) => {
        let excalidrawElement;
        switch (element.type) {
          case "line":
            excalidrawElement = transformToExcalidrawLineSkeleton(element);
            break;
          case "rectangle":
          case "ellipse":
            excalidrawElement = transformToExcalidrawContainerSkeleton(element);
            break;
          case "text":
            excalidrawElement = transformToExcalidrawTextSkeleton(element);
            break;
          default:
            throw `unknown type ${element.type}`;
            break;
        }
        elements.push(excalidrawElement);
      });
    });
    Object.values(chart.lines).forEach((line) => {
      if (!line) {
        return;
      }
      elements.push(transformToExcalidrawLineSkeleton(line));
    });
    Object.values(chart.arrows).forEach((arrow) => {
      if (!arrow) {
        return;
      }
      const excalidrawElement = transformToExcalidrawArrowSkeleton(arrow);
      elements.push(excalidrawElement);
    });
    Object.values(chart.text).forEach((ele) => {
      const excalidrawElement = transformToExcalidrawTextSkeleton(ele);
      elements.push(excalidrawElement);
    });
    Object.values(chart.namespaces).forEach((namespace) => {
      const classIds = Object.keys(namespace.classes);
      const children = [...classIds];
      const chartElements = [...chart.lines, ...chart.arrows, ...chart.text];
      classIds.forEach((classId) => {
        const childIds = chartElements.filter((ele) => ele.metadata && "class" in ele.metadata && ele.metadata.classId === classId).map((ele) => ele.id);
        if (childIds.length) {
          children.push(...childIds);
        }
      });
      const frame = {
        type: "frame",
        id: nanoid(),
        name: namespace.id,
        children
      };
      elements.push(frame);
    });
    return { elements };
  }
});

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/graphToExcalidraw.js
var graphToExcalidraw = (graph, options = {}) => {
  switch (graph.type) {
    case "graphImage": {
      return GraphImageConverter.convert(graph, options);
    }
    case "flowchart": {
      return FlowchartToExcalidrawSkeletonConverter.convert(graph, options);
    }
    case "sequence": {
      return SequenceToExcalidrawSkeletonConvertor.convert(graph, options);
    }
    case "class": {
      return classToExcalidrawSkeletonConvertor.convert(graph, options);
    }
    default: {
      throw new Error(`graphToExcalidraw: unknown graph type "${graph.type}, only flowcharts are supported!"`);
    }
  }
};

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/parseMermaid.js
init_define_import_meta_env();

// ../../node_modules/mermaid/dist/mermaid.core.mjs
init_define_import_meta_env();
var import_dayjs = __toESM(require_dayjs_min(), 1);
var import_sanitize_url = __toESM(require_dist(), 1);
var import_dompurify = __toESM(require_purify(), 1);

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/utils.js
init_define_import_meta_env();
var entityCodesToText = (input) => {
  input = decodeEntities(input);
  const modifiedInput = input.replace(/#(\d+);/g, "&#$1;").replace(/#([a-z]+);/g, "&$1;");
  const element = document.createElement("textarea");
  element.innerHTML = modifiedInput;
  return element.value;
};
var getTransformAttr = (el) => {
  const transformAttr = el.getAttribute("transform");
  const translateMatch = transformAttr?.match(/translate\(([ \d.-]+),\s*([\d.-]+)\)/);
  let transformX = 0;
  let transformY = 0;
  if (translateMatch) {
    transformX = Number(translateMatch[1]);
    transformY = Number(translateMatch[2]);
  }
  return { transformX, transformY };
};
var encodeEntities = (text) => {
  let txt = text;
  txt = txt.replace(/style.*:\S*#.*;/g, (s) => {
    return s.substring(0, s.length - 1);
  });
  txt = txt.replace(/classDef.*:\S*#.*;/g, (s) => {
    return s.substring(0, s.length - 1);
  });
  txt = txt.replace(/#\w+;/g, (s) => {
    const innerTxt = s.substring(1, s.length - 1);
    const isInt = /^\+?\d+$/.test(innerTxt);
    if (isInt) {
      return `\uFB02\xB0\xB0${innerTxt}\xB6\xDF`;
    }
    return `\uFB02\xB0${innerTxt}\xB6\xDF`;
  });
  return txt;
};
var decodeEntities = function(text) {
  return text.replace(/ﬂ°°/g, "#").replace(/ﬂ°/g, "&").replace(/¶ß/g, ";");
};
var computeEdgePositions = (pathElement, offset = { x: 0, y: 0 }) => {
  if (pathElement.tagName.toLowerCase() !== "path") {
    throw new Error(`Invalid input: Expected an HTMLElement of tag "path", got ${pathElement.tagName}`);
  }
  const dAttr = pathElement.getAttribute("d");
  if (!dAttr) {
    throw new Error('Path element does not contain a "d" attribute');
  }
  const commands = dAttr.split(/(?=[LM])/);
  const startPosition = commands[0].substring(1).split(",").map((coord) => parseFloat(coord));
  const endPosition = commands[commands.length - 1].substring(1).split(",").map((coord) => parseFloat(coord));
  const reflectionPoints = commands.map((command) => {
    const coords = command.substring(1).split(",").map((coord) => parseFloat(coord));
    return { x: coords[0], y: coords[1] };
  }).filter((point, index, array) => {
    if (index === array.length - 1) {
      return true;
    }
    const prevPoint = array[index - 1];
    return index === 0 || point.x !== prevPoint.x && point.y !== prevPoint.y;
  }).map((p) => {
    return {
      x: p.x + offset.x,
      y: p.y + offset.y
    };
  });
  return {
    startX: startPosition[0] + offset.x,
    startY: startPosition[1] + offset.y,
    endX: endPosition[0] + offset.x,
    endY: endPosition[1] + offset.y,
    reflectionPoints
  };
};

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/parser/flowchart.js
init_define_import_meta_env();
var parseSubGraph = (data, containerEl) => {
  const nodeIds = data.nodes.map((n) => {
    if (n.startsWith("flowchart-")) {
      return n.split("-")[1];
    }
    return n;
  });
  const el = containerEl.querySelector(`[id='${data.id}']`);
  if (!el) {
    throw new Error("SubGraph element not found");
  }
  const position = computeElementPosition(el, containerEl);
  const boundingBox = el.getBBox();
  const dimension = {
    width: boundingBox.width,
    height: boundingBox.height
  };
  data.classes = void 0;
  data.dir = void 0;
  return {
    ...data,
    nodeIds,
    ...position,
    ...dimension,
    text: entityCodesToText(data.title)
  };
};
var parseVertex = (data, containerEl) => {
  const el = containerEl.querySelector(`[id*="flowchart-${data.id}-"]`);
  if (!el) {
    return void 0;
  }
  let link;
  if (el.parentElement?.tagName.toLowerCase() === "a") {
    link = el.parentElement.getAttribute("xlink:href");
  }
  const position = computeElementPosition(link ? el.parentElement : el, containerEl);
  const boundingBox = el.getBBox();
  const dimension = {
    width: boundingBox.width,
    height: boundingBox.height
  };
  const labelContainerStyleText = el.querySelector(".label-container")?.getAttribute("style");
  const labelStyleText = el.querySelector(".label")?.getAttribute("style");
  const containerStyle = {};
  labelContainerStyleText?.split(";").forEach((property) => {
    if (!property) {
      return;
    }
    const key = property.split(":")[0].trim();
    const value = property.split(":")[1].trim();
    containerStyle[key] = value;
  });
  const labelStyle = {};
  labelStyleText?.split(";").forEach((property) => {
    if (!property) {
      return;
    }
    const key = property.split(":")[0].trim();
    const value = property.split(":")[1].trim();
    labelStyle[key] = value;
  });
  return {
    id: data.id,
    labelType: data.labelType,
    text: entityCodesToText(data.text),
    type: data.type,
    link: link || void 0,
    ...position,
    ...dimension,
    containerStyle,
    labelStyle
  };
};
var parseEdge = (data, containerEl) => {
  const el = containerEl.querySelector(`[id*="L-${data.start}-${data.end}"]`);
  if (!el) {
    throw new Error("Edge element not found");
  }
  const position = computeElementPosition(el, containerEl);
  const edgePositionData = computeEdgePositions(el, position);
  data.length = void 0;
  return {
    ...data,
    ...edgePositionData,
    text: entityCodesToText(data.text)
  };
};
var computeElementPosition = (el, containerEl) => {
  if (!el) {
    throw new Error("Element not found");
  }
  let root = el.parentElement?.parentElement;
  const childElement = el.childNodes[0];
  let childPosition = { x: 0, y: 0 };
  if (childElement) {
    const { transformX: transformX2, transformY: transformY2 } = getTransformAttr(childElement);
    const boundingBox = childElement.getBBox();
    childPosition = {
      x: Number(childElement.getAttribute("x")) || transformX2 + boundingBox.x || 0,
      y: Number(childElement.getAttribute("y")) || transformY2 + boundingBox.y || 0
    };
  }
  const { transformX, transformY } = getTransformAttr(el);
  const position = {
    x: transformX + childPosition.x,
    y: transformY + childPosition.y
  };
  while (root && root.id !== containerEl.id) {
    if (root.classList.value === "root" && root.hasAttribute("transform")) {
      const { transformX: transformX2, transformY: transformY2 } = getTransformAttr(root);
      position.x += transformX2;
      position.y += transformY2;
    }
    root = root.parentElement;
  }
  return position;
};
var parseMermaidFlowChartDiagram = (diagram, containerEl) => {
  diagram.parse();
  const mermaidParser = diagram.parser.yy;
  const vertices = mermaidParser.getVertices();
  Object.keys(vertices).forEach((id) => {
    vertices[id] = parseVertex(vertices[id], containerEl);
  });
  const edges = mermaidParser.getEdges().map((data) => parseEdge(data, containerEl));
  const subGraphs = mermaidParser.getSubGraphs().map((data) => parseSubGraph(data, containerEl));
  return {
    type: "flowchart",
    subGraphs,
    vertices,
    edges
  };
};

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/parser/sequence.js
init_define_import_meta_env();

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/elementSkeleton.js
init_define_import_meta_env();
var createArrowSkeletonFromSVG = (arrowNode, opts) => {
  const arrow = {};
  if (opts?.label) {
    arrow.label = { text: entityCodesToText(opts.label), fontSize: 16 };
  }
  const tagName = arrowNode.tagName;
  if (tagName === "line") {
    arrow.startX = Number(arrowNode.getAttribute("x1"));
    arrow.startY = Number(arrowNode.getAttribute("y1"));
    arrow.endX = Number(arrowNode.getAttribute("x2"));
    arrow.endY = Number(arrowNode.getAttribute("y2"));
  } else if (tagName === "path") {
    const dAttr = arrowNode.getAttribute("d");
    if (!dAttr) {
      throw new Error('Path element does not contain a "d" attribute');
    }
    const commands = dAttr.split(/(?=[LC])/);
    const startPosition = commands[0].substring(1).split(",").map((coord) => parseFloat(coord));
    const points = [];
    commands.forEach((command) => {
      const currPoints = command.substring(1).trim().split(" ").map((pos) => {
        const [x, y] = pos.split(",");
        return [
          parseFloat(x) - startPosition[0],
          parseFloat(y) - startPosition[1]
        ];
      });
      points.push(...currPoints);
    });
    const endPosition = points[points.length - 1];
    arrow.startX = startPosition[0];
    arrow.startY = startPosition[1];
    arrow.endX = endPosition[0];
    arrow.endY = endPosition[1];
    arrow.points = points;
  }
  if (opts?.label) {
    const offset = 10;
    arrow.startY = arrow.startY - offset;
    arrow.endY = arrow.endY - offset;
  }
  arrow.strokeColor = arrowNode.getAttribute("stroke");
  arrow.strokeWidth = Number(arrowNode.getAttribute("stroke-width"));
  arrow.type = "arrow";
  arrow.strokeStyle = opts?.strokeStyle || "solid";
  arrow.startArrowhead = opts?.startArrowhead || null;
  arrow.endArrowhead = opts?.endArrowhead || null;
  return arrow;
};
var createArrowSkeletion = (startX, startY, endX, endY, opts) => {
  const arrow = {};
  arrow.type = "arrow";
  arrow.startX = startX;
  arrow.startY = startY;
  arrow.endX = endX;
  arrow.endY = endY;
  Object.assign(arrow, { ...opts });
  return arrow;
};
var createTextSkeleton = (x, y, text, opts) => {
  const textElement = {
    type: "text",
    x,
    y,
    text,
    width: opts?.width || 20,
    height: opts?.height || 20,
    fontSize: opts?.fontSize || DEFAULT_FONT_SIZE,
    id: opts?.id,
    groupId: opts?.groupId,
    metadata: opts?.metadata
  };
  return textElement;
};
var createTextSkeletonFromSVG = (textNode, text, opts) => {
  const node = {};
  const x = Number(textNode.getAttribute("x"));
  const y = Number(textNode.getAttribute("y"));
  node.type = "text";
  node.text = entityCodesToText(text);
  if (opts?.id) {
    node.id = opts.id;
  }
  if (opts?.groupId) {
    node.groupId = opts.groupId;
  }
  const boundingBox = textNode.getBBox();
  node.width = boundingBox.width;
  node.height = boundingBox.height;
  node.x = x - boundingBox.width / 2;
  node.y = y;
  const fontSize = parseInt(getComputedStyle(textNode).fontSize);
  node.fontSize = fontSize;
  return node;
};
var createContainerSkeletonFromSVG = (node, type, opts = {}) => {
  const container = {};
  container.type = type;
  const { label, subtype, id, groupId } = opts;
  container.id = id;
  if (groupId) {
    container.groupId = groupId;
  }
  if (label) {
    container.label = {
      text: entityCodesToText(label.text),
      fontSize: 16,
      verticalAlign: label?.verticalAlign
    };
  }
  const boundingBox = node.getBBox();
  container.x = boundingBox.x;
  container.y = boundingBox.y;
  container.width = boundingBox.width;
  container.height = boundingBox.height;
  container.subtype = subtype;
  switch (subtype) {
    case "highlight":
      const bgColor = node.getAttribute("fill");
      if (bgColor) {
        container.bgColor = bgColor;
      }
      break;
    case "note":
      container.strokeStyle = "dashed";
      break;
  }
  return container;
};
var createLineSkeletonFromSVG = (lineNode, startX, startY, endX, endY, opts) => {
  const line = {};
  line.startX = startX;
  line.startY = startY;
  line.endX = endX;
  if (opts?.groupId) {
    line.groupId = opts.groupId;
  }
  if (opts?.id) {
    line.id = opts.id;
  }
  line.endY = endY;
  line.strokeColor = lineNode.getAttribute("stroke");
  line.strokeWidth = Number(lineNode.getAttribute("stroke-width"));
  line.type = "line";
  return line;
};

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/parser/sequence.js
var SEQUENCE_ARROW_TYPES = {
  0: "SOLID",
  1: "DOTTED",
  3: "SOLID_CROSS",
  4: "DOTTED_CROSS",
  5: "SOLID_OPEN",
  6: "DOTTED_OPEN",
  24: "SOLID_POINT",
  25: "DOTTED_POINT"
};
var MESSAGE_TYPE = {
  SOLID: 0,
  DOTTED: 1,
  NOTE: 2,
  SOLID_CROSS: 3,
  DOTTED_CROSS: 4,
  SOLID_OPEN: 5,
  DOTTED_OPEN: 6,
  LOOP_START: 10,
  LOOP_END: 11,
  ALT_START: 12,
  ALT_ELSE: 13,
  ALT_END: 14,
  OPT_START: 15,
  OPT_END: 16,
  ACTIVE_START: 17,
  ACTIVE_END: 18,
  PAR_START: 19,
  PAR_AND: 20,
  PAR_END: 21,
  RECT_START: 22,
  RECT_END: 23,
  SOLID_POINT: 24,
  DOTTED_POINT: 25,
  AUTONUMBER: 26,
  CRITICAL_START: 27,
  CRITICAL_OPTION: 28,
  CRITICAL_END: 29,
  BREAK_START: 30,
  BREAK_END: 31,
  PAR_OVER_START: 32
};
var getStrokeStyle = (type) => {
  let strokeStyle;
  switch (type) {
    case MESSAGE_TYPE.SOLID:
    case MESSAGE_TYPE.SOLID_CROSS:
    case MESSAGE_TYPE.SOLID_OPEN:
    case MESSAGE_TYPE.SOLID_POINT:
      strokeStyle = "solid";
      break;
    case MESSAGE_TYPE.DOTTED:
    case MESSAGE_TYPE.DOTTED_CROSS:
    case MESSAGE_TYPE.DOTTED_OPEN:
    case MESSAGE_TYPE.DOTTED_POINT:
      strokeStyle = "dotted";
      break;
    default:
      strokeStyle = "solid";
      break;
  }
  return strokeStyle;
};
var attachSequenceNumberToArrow = (node, arrow) => {
  const showSequenceNumber = !!node.nextElementSibling?.classList.contains("sequenceNumber");
  if (showSequenceNumber) {
    const text = node.nextElementSibling?.textContent;
    if (!text) {
      throw new Error("sequence number not present");
    }
    const height = 30;
    const yOffset = height / 2;
    const xOffset = 10;
    const sequenceNumber = {
      type: "rectangle",
      x: arrow.startX - xOffset,
      y: arrow.startY - yOffset,
      label: { text, fontSize: 14 },
      bgColor: "#e9ecef",
      height,
      subtype: "sequence"
    };
    Object.assign(arrow, { sequenceNumber });
  }
};
var createActorSymbol = (rootNode, text, opts) => {
  if (!rootNode) {
    throw "root node not found";
  }
  const groupId = nanoid();
  const children = Array.from(rootNode.children);
  const nodeElements = [];
  children.forEach((child, index) => {
    const id = `${opts?.id}-${index}`;
    let ele;
    switch (child.tagName) {
      case "line":
        const startX = Number(child.getAttribute("x1"));
        const startY = Number(child.getAttribute("y1"));
        const endX = Number(child.getAttribute("x2"));
        const endY = Number(child.getAttribute("y2"));
        ele = createLineSkeletonFromSVG(child, startX, startY, endX, endY, { groupId, id });
        break;
      case "text":
        ele = createTextSkeletonFromSVG(child, text, {
          groupId,
          id
        });
        break;
      case "circle":
        ele = createContainerSkeletonFromSVG(child, "ellipse", {
          label: child.textContent ? { text: child.textContent } : void 0,
          groupId,
          id
        });
      default:
        ele = createContainerSkeletonFromSVG(child, SVG_TO_SHAPE_MAPPER[child.tagName], {
          label: child.textContent ? { text: child.textContent } : void 0,
          groupId,
          id
        });
    }
    nodeElements.push(ele);
  });
  return nodeElements;
};
var parseActor = (actors, containerEl) => {
  const actorRootNodes = Array.from(containerEl.querySelectorAll(".actor")).filter((node) => node.tagName === "text").map((actor) => actor.parentElement);
  const nodes = [];
  const lines = [];
  const actorsLength = Object.keys(actors).length;
  Object.values(actors).forEach((actor, index) => {
    const topRootNode = actorRootNodes[index];
    const bottomRootNode = actorRootNodes[actorsLength + index];
    if (!topRootNode || !bottomRootNode) {
      throw "root not found";
    }
    const text = actor.description;
    if (actor.type === "participant") {
      const topNodeElement = createContainerSkeletonFromSVG(topRootNode.firstChild, "rectangle", { id: `${actor.name}-top`, label: { text }, subtype: "actor" });
      if (!topNodeElement) {
        throw "Top Node element not found!";
      }
      nodes.push([topNodeElement]);
      const bottomNodeElement = createContainerSkeletonFromSVG(bottomRootNode.firstChild, "rectangle", { id: `${actor.name}-bottom`, label: { text }, subtype: "actor" });
      nodes.push([bottomNodeElement]);
      const lineNode = topRootNode.previousElementSibling;
      if (lineNode?.tagName !== "line") {
        throw "Line not found";
      }
      const startX = Number(lineNode.getAttribute("x1"));
      if (!topNodeElement.height) {
        throw "Top node element height is null";
      }
      const startY = topNodeElement.y + topNodeElement.height;
      const endY = bottomNodeElement.y;
      const endX = Number(lineNode.getAttribute("x2"));
      const line = createLineSkeletonFromSVG(lineNode, startX, startY, endX, endY);
      lines.push(line);
    } else if (actor.type === "actor") {
      const topNodeElement = createActorSymbol(topRootNode, text, {
        id: `${actor.name}-top`
      });
      nodes.push(topNodeElement);
      const bottomNodeElement = createActorSymbol(bottomRootNode, text, {
        id: `${actor.name}-bottom`
      });
      nodes.push(bottomNodeElement);
      const lineNode = topRootNode.previousElementSibling;
      if (lineNode?.tagName !== "line") {
        throw "Line not found";
      }
      const startX = Number(lineNode.getAttribute("x1"));
      const startY = Number(lineNode.getAttribute("y1"));
      const endX = Number(lineNode.getAttribute("x2"));
      const bottomEllipseNode = bottomNodeElement.find((node) => node.type === "ellipse");
      if (bottomEllipseNode) {
        const endY = bottomEllipseNode.y;
        const line = createLineSkeletonFromSVG(lineNode, startX, startY, endX, endY);
        lines.push(line);
      }
    }
  });
  return { nodes, lines };
};
var computeArrows = (messages, containerEl) => {
  const arrows = [];
  const arrowNodes = Array.from(containerEl.querySelectorAll('[class*="messageLine"]'));
  const supportedMessageTypes = Object.keys(SEQUENCE_ARROW_TYPES);
  const arrowMessages = messages.filter((message) => supportedMessageTypes.includes(message.type.toString()));
  arrowNodes.forEach((arrowNode, index) => {
    const message = arrowMessages[index];
    const messageType = SEQUENCE_ARROW_TYPES[message.type];
    const arrow = createArrowSkeletonFromSVG(arrowNode, {
      label: message?.message,
      strokeStyle: getStrokeStyle(message.type),
      endArrowhead: messageType === "SOLID_OPEN" || messageType === "DOTTED_OPEN" ? null : "arrow"
    });
    attachSequenceNumberToArrow(arrowNode, arrow);
    arrows.push(arrow);
  });
  return arrows;
};
var computeNotes = (messages, containerEl) => {
  const noteNodes = Array.from(containerEl.querySelectorAll(".note")).map((node) => node.parentElement);
  const noteText = messages.filter((message) => message.type === MESSAGE_TYPE.NOTE);
  const notes = [];
  noteNodes.forEach((node, index) => {
    if (!node) {
      return;
    }
    const rect = node.firstChild;
    const text = noteText[index].message;
    const note = createContainerSkeletonFromSVG(rect, "rectangle", {
      label: { text },
      subtype: "note"
    });
    notes.push(note);
  });
  return notes;
};
var parseActivations = (containerEl) => {
  const activationNodes = Array.from(containerEl.querySelectorAll(`[class*=activation]`));
  const activations = [];
  activationNodes.forEach((node) => {
    const rect = createContainerSkeletonFromSVG(node, "rectangle", {
      label: { text: "" },
      subtype: "activation"
    });
    activations.push(rect);
  });
  return activations;
};
var parseLoops = (messages, containerEl) => {
  const lineNodes = Array.from(containerEl.querySelectorAll(".loopLine"));
  const lines = [];
  const texts = [];
  const nodes = [];
  lineNodes.forEach((node) => {
    const startX = Number(node.getAttribute("x1"));
    const startY = Number(node.getAttribute("y1"));
    const endX = Number(node.getAttribute("x2"));
    const endY = Number(node.getAttribute("y2"));
    const line = createLineSkeletonFromSVG(node, startX, startY, endX, endY);
    line.strokeStyle = "dotted";
    line.strokeColor = "#adb5bd";
    line.strokeWidth = 2;
    lines.push(line);
  });
  const loopTextNodes = Array.from(containerEl.querySelectorAll(".loopText"));
  const criticalMessages = messages.filter((message) => message.type === MESSAGE_TYPE.CRITICAL_START).map((message) => message.message);
  loopTextNodes.forEach((node) => {
    const text = node.textContent || "";
    const textElement = createTextSkeletonFromSVG(node, text);
    const rawText = text.match(/\[(.*?)\]/)?.[1] || "";
    const isCritical = criticalMessages.includes(rawText);
    if (isCritical) {
      textElement.x += 16;
    }
    texts.push(textElement);
  });
  const labelBoxes = Array.from(containerEl?.querySelectorAll(".labelBox"));
  const labelTextNode = Array.from(containerEl?.querySelectorAll(".labelText"));
  labelBoxes.forEach((labelBox, index) => {
    const text = labelTextNode[index]?.textContent || "";
    const container = createContainerSkeletonFromSVG(labelBox, "rectangle", {
      label: { text }
    });
    container.strokeColor = "#adb5bd";
    container.bgColor = "#e9ecef";
    container.width = void 0;
    nodes.push(container);
  });
  return { lines, texts, nodes };
};
var computeHighlights = (containerEl) => {
  const rects = Array.from(containerEl.querySelectorAll(".rect")).filter((node) => node.parentElement?.tagName !== "g");
  const nodes = [];
  rects.forEach((rect) => {
    const node = createContainerSkeletonFromSVG(rect, "rectangle", {
      label: { text: "" },
      subtype: "highlight"
    });
    nodes.push(node);
  });
  return nodes;
};
var parseMermaidSequenceDiagram = (diagram, containerEl) => {
  diagram.parse();
  const mermaidParser = diagram.parser.yy;
  const nodes = [];
  const groups = mermaidParser.getBoxes();
  const bgHightlights = computeHighlights(containerEl);
  const actorData = mermaidParser.getActors();
  const { nodes: actors, lines } = parseActor(actorData, containerEl);
  const messages = mermaidParser.getMessages();
  const arrows = computeArrows(messages, containerEl);
  const notes = computeNotes(messages, containerEl);
  const activations = parseActivations(containerEl);
  const loops = parseLoops(messages, containerEl);
  nodes.push(bgHightlights);
  nodes.push(...actors);
  nodes.push(notes);
  nodes.push(activations);
  return { type: "sequence", lines, arrows, nodes, loops, groups };
};

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/parser/class.js
init_define_import_meta_env();
var RELATION_TYPE = {
  AGGREGATION: 0,
  EXTENSION: 1,
  COMPOSITION: 2,
  DEPENDENCY: 3,
  LOLLIPOP: 4
};
var LINE_TYPE = {
  LINE: 0,
  DOTTED_LINE: 1
};
var getStrokeStyle2 = (type) => {
  let lineType;
  switch (type) {
    case LINE_TYPE.LINE:
      lineType = "solid";
      break;
    case LINE_TYPE.DOTTED_LINE:
      lineType = "dotted";
      break;
    default:
      lineType = "solid";
  }
  return lineType;
};
var getArrowhead = (type) => {
  let arrowhead;
  switch (type) {
    case RELATION_TYPE.AGGREGATION:
      arrowhead = "diamond_outline";
      break;
    case RELATION_TYPE.COMPOSITION:
      arrowhead = "diamond";
      break;
    case RELATION_TYPE.EXTENSION:
      arrowhead = "triangle_outline";
      break;
    case "none":
      arrowhead = null;
      break;
    case RELATION_TYPE.DEPENDENCY:
    default:
      arrowhead = "arrow";
      break;
  }
  return arrowhead;
};
var parseClasses = (classes, containerEl) => {
  const nodes = [];
  const lines = [];
  const text = [];
  Object.values(classes).forEach((classNode) => {
    const { domId, id } = classNode;
    const groupId = nanoid();
    const domNode = containerEl.querySelector(`[id*=classId-${id}]`);
    if (!domNode) {
      throw Error(`DOM Node with id ${domId} not found`);
    }
    const { transformX, transformY } = getTransformAttr(domNode);
    const container = createContainerSkeletonFromSVG(domNode.firstChild, "rectangle", { id, groupId });
    container.x += transformX;
    container.y += transformY;
    container.metadata = { classId: id };
    nodes.push(container);
    const lineNodes = Array.from(domNode.querySelectorAll(".divider"));
    lineNodes.forEach((lineNode) => {
      const startX = Number(lineNode.getAttribute("x1"));
      const startY = Number(lineNode.getAttribute("y1"));
      const endX = Number(lineNode.getAttribute("x2"));
      const endY = Number(lineNode.getAttribute("y2"));
      const line = createLineSkeletonFromSVG(lineNode, startX, startY, endX, endY, {
        groupId,
        id: nanoid()
      });
      line.startX += transformX;
      line.startY += transformY;
      line.endX += transformX;
      line.endY += transformY;
      line.metadata = { classId: id };
      lines.push(line);
    });
    const labelNodes = domNode.querySelector(".label")?.children;
    if (!labelNodes) {
      throw "label nodes not found";
    }
    Array.from(labelNodes).forEach((node) => {
      const label = node.textContent;
      if (!label) {
        return;
      }
      const id2 = nanoid();
      const { transformX: textTransformX, transformY: textTransformY } = getTransformAttr(node);
      const boundingBox = node.getBBox();
      const offsetY = 10;
      const textElement = createTextSkeleton(transformX + textTransformX, transformY + textTransformY + offsetY, label, {
        width: boundingBox.width,
        height: boundingBox.height,
        id: id2,
        groupId,
        metadata: { classId: id2 }
      });
      text.push(textElement);
    });
  });
  return { nodes, lines, text };
};
var parseRelations = (relations, classNodes, containerEl, direction) => {
  const edges = containerEl.querySelector(".edgePaths")?.children;
  if (!edges) {
    throw new Error("No Edges found!");
  }
  const arrows = [];
  const text = [];
  relations.forEach((relationNode, index) => {
    const { id1, id2, relation } = relationNode;
    const node1 = classNodes.find((node) => node.id === id1);
    const node2 = classNodes.find((node) => node.id === id2);
    const strokeStyle = getStrokeStyle2(relation.lineType);
    const startArrowhead = getArrowhead(relation.type1);
    const endArrowhead = getArrowhead(relation.type2);
    const edgePositionData = computeEdgePositions(edges[index]);
    const { startX, startY, endX, endY } = edgePositionData;
    const arrow = createArrowSkeletion(startX, startY, endX, endY, {
      strokeStyle,
      startArrowhead,
      endArrowhead,
      label: relationNode.title ? { text: relationNode.title } : void 0,
      start: { type: "rectangle", id: node1.id },
      end: { type: "rectangle", id: node2.id }
    });
    arrows.push(arrow);
    const { relationTitle1, relationTitle2 } = relationNode;
    const offsetX = 20;
    const offsetY = 15;
    const directionOffset = 15;
    let x;
    let y;
    if (relationTitle1 && relationTitle1 !== "none") {
      switch (direction) {
        case "TB":
          x = startX - offsetX;
          if (endX < startX) {
            x -= directionOffset;
          }
          y = startY + offsetY;
          break;
        case "BT":
          x = startX + offsetX;
          if (endX > startX) {
            x += directionOffset;
          }
          y = startY - offsetY;
          break;
        case "LR":
          x = startX + offsetX;
          y = startY + offsetY;
          if (endY > startY) {
            y += directionOffset;
          }
          break;
        case "RL":
          x = startX - offsetX;
          y = startY - offsetY;
          if (startY > endY) {
            y -= directionOffset;
          }
          break;
        default:
          x = startX - offsetX;
          y = startY + offsetY;
      }
      const relationTitleElement = createTextSkeleton(x, y, relationTitle1, {
        fontSize: 16
      });
      text.push(relationTitleElement);
    }
    if (relationTitle2 && relationTitle2 !== "none") {
      switch (direction) {
        case "TB":
          x = endX + offsetX;
          if (endX < startX) {
            x += directionOffset;
          }
          y = endY - offsetY;
          break;
        case "BT":
          x = endX - offsetX;
          if (endX > startX) {
            x -= directionOffset;
          }
          y = endY + offsetY;
          break;
        case "LR":
          x = endX - offsetX;
          y = endY - offsetY;
          if (endY > startY) {
            y -= directionOffset;
          }
          break;
        case "RL":
          x = endX + offsetX;
          y = endY + offsetY;
          if (startY > endY) {
            y += directionOffset;
          }
          break;
        default:
          x = endX + offsetX;
          y = endY - offsetY;
      }
      const relationTitleElement = createTextSkeleton(x, y, relationTitle2, {
        fontSize: 16
      });
      text.push(relationTitleElement);
    }
  });
  return { arrows, text };
};
var parseNotes = (notes, containerEl, classNodes) => {
  const noteContainers = [];
  const connectors = [];
  notes.forEach((note) => {
    const { id, text, class: classId } = note;
    const node = containerEl.querySelector(`#${id}`);
    if (!node) {
      throw new Error(`Node with id ${id} not found!`);
    }
    const { transformX, transformY } = getTransformAttr(node);
    const rect = node.firstChild;
    const container = createContainerSkeletonFromSVG(rect, "rectangle", {
      id,
      subtype: "note",
      label: { text }
    });
    Object.assign(container, {
      x: container.x + transformX,
      y: container.y + transformY
    });
    noteContainers.push(container);
    if (classId) {
      const classNode = classNodes.find((node2) => node2.id === classId);
      if (!classNode) {
        throw new Error(`class node with id ${classId} not found!`);
      }
      const startX = container.x + (container.width || 0) / 2;
      const startY = container.y + (container.height || 0);
      const endX = startX;
      const endY = classNode.y;
      const connector = createArrowSkeletion(startX, startY, endX, endY, {
        strokeStyle: "dotted",
        startArrowhead: null,
        endArrowhead: null,
        start: { id: container.id, type: "rectangle" },
        end: { id: classNode.id, type: "rectangle" }
      });
      connectors.push(connector);
    }
  });
  return { notes: noteContainers, connectors };
};
var parseMermaidClassDiagram = (diagram, containerEl) => {
  diagram.parse();
  const mermaidParser = diagram.parser.yy;
  const direction = mermaidParser.getDirection();
  const nodes = [];
  const lines = [];
  const text = [];
  const classNodes = [];
  const namespaces = mermaidParser.getNamespaces();
  if (Object.keys(namespaces).length) {
    Object.values(namespaces).forEach((namespace) => {
      const namespaceClassData = parseClasses(namespace.classes, containerEl);
      nodes.push(namespaceClassData.nodes);
      lines.push(...namespaceClassData.lines);
      text.push(...namespaceClassData.text);
      classNodes.push(...namespaceClassData.nodes);
    });
  }
  const classes = mermaidParser.getClasses();
  if (Object.keys(classes).length) {
    const classData = parseClasses(classes, containerEl);
    nodes.push(classData.nodes);
    lines.push(...classData.lines);
    text.push(...classData.text);
    classNodes.push(...classData.nodes);
  }
  const relations = mermaidParser.getRelations();
  const { arrows, text: relationTitles } = parseRelations(relations, classNodes, containerEl, direction);
  const { notes, connectors } = parseNotes(mermaidParser.getNotes(), containerEl, classNodes);
  nodes.push(notes);
  arrows.push(...connectors);
  text.push(...relationTitles);
  return { type: "class", nodes, lines, arrows, text, namespaces };
};

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/parseMermaid.js
var convertSvgToGraphImage = (svgContainer) => {
  const svgEl = svgContainer.querySelector("svg");
  if (!svgEl) {
    throw new Error("SVG element not found");
  }
  const rect = svgEl.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  svgEl.setAttribute("width", `${width}`);
  svgEl.setAttribute("height", `${height}`);
  const mimeType = "image/svg+xml";
  const decoded = unescape(encodeURIComponent(svgEl.outerHTML));
  const base64 = btoa(decoded);
  const dataURL = `data:image/svg+xml;base64,${base64}`;
  const graphImage = {
    type: "graphImage",
    mimeType,
    dataURL,
    width,
    height
  };
  return graphImage;
};
var parseMermaid = async (definition) => {
  mermaid.initialize(MERMAID_CONFIG);
  const diagram = await mermaid.mermaidAPI.getDiagramFromText(encodeEntities(definition));
  const { svg } = await mermaid.render("mermaid-to-excalidraw", definition);
  const svgContainer = document.createElement("div");
  svgContainer.setAttribute("style", `opacity: 0; position: relative; z-index: -1;`);
  svgContainer.innerHTML = svg;
  svgContainer.id = "mermaid-diagram";
  document.body.appendChild(svgContainer);
  let data;
  switch (diagram.type) {
    case "flowchart-v2": {
      data = parseMermaidFlowChartDiagram(diagram, svgContainer);
      break;
    }
    case "sequence": {
      data = parseMermaidSequenceDiagram(diagram, svgContainer);
      break;
    }
    case "classDiagram": {
      data = parseMermaidClassDiagram(diagram, svgContainer);
      break;
    }
    default: {
      data = convertSvgToGraphImage(svgContainer);
    }
  }
  svgContainer.remove();
  return data;
};

// ../../node_modules/@excalidraw/mermaid-to-excalidraw/dist/index.js
var parseMermaidToExcalidraw = async (definition, options = {}) => {
  const parsedMermaidData = await parseMermaid(definition);
  const excalidrawElements = graphToExcalidraw(parsedMermaidData, options);
  return excalidrawElements;
};
export {
  parseMermaidToExcalidraw
};
//# sourceMappingURL=dist-YQP5HP65.js.map
