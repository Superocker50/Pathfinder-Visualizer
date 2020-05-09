function createGraph(width, height) {
    let graph = [[]]
    for (let row = 0; row < width; row++) {
        graph[row] = []
        for (let col = 0; col < height; col++) {
            graph[row][col] = []
            let currentNode = graph[row][col]
            currentNode.row = row
            currentNode.col = col
            currentNode.isVisited = false
            currentNode.distance = Infinity
            currentNode.previous = null
        }
    }
    return graph
}

function nodesNotVisitedFromGivenNode(graph, node, width, height) {
    let nodes = []

    if (node.col - 1 >= 0 && node.row >= 0) {
        let top = graph[node.row][node.col - 1]
        if (!top.isVisited) nodes.push(top)
    }
    if (node.row - 1 >= 0 && node.col >= 0) {
        let left = graph[node.row - 1][node.col]
        if (!left.isVisited) nodes.push(left)
    }
    if (node.row + 1 < width && node.col >= 0) {
        let right = graph[node.row + 1][node.col]
        if (!right.isVisited) nodes.push(right)
    }
    if (node.row >= 0 && node.col + 1 < height) {
        let bottom = graph[node.row][node.col + 1]
        if (!bottom.isVisited) nodes.push(bottom)
    }
    return nodes
}

export function dijkstra(width, height, startX, startY, endX, endY) {
    let visitedNodesInOrder = []
    let startNodeAnimate = 0
    let animatedNormalNodes = []
    let endNodeAnimate = 0
    let graph = createGraph(width, height)
    graph[startX][startY].distance = 0

    let closestNode = findNodeWithMinDist(graph, width, height)
    let startNode = closestNode
    let endNode = graph[endX][endY]

    while (closestNode.row !== endX || closestNode.col !== endY) {
        closestNode.isVisited = true
        visitedNodesInOrder.push(closestNode)

        let { row, col } = closestNode

        if (closestNode === startNode) {
            startNodeAnimate = setTimeout(() => {
                document.getElementById(`node-${row}-${col}`)
                    .className = "dot startNodeAnimate"
            }, (visitedNodesInOrder.length) * 100)
        }
        if (closestNode !== startNode) {
            animatedNormalNodes.push(
                setTimeout(() => {
                    document.getElementById(`node-${row}-${col}`)
                        .className = "dot visitedNode"
                }, (visitedNodesInOrder.length - 1) * 100)
            )
        }

        let unVisitedNodes = nodesNotVisitedFromGivenNode(graph, closestNode, width, height)
        updateDist(graph, unVisitedNodes, closestNode)

        closestNode = findNodeWithMinDist(graph, width, height)
    }

    endNodeAnimate = setTimeout(() => {
        document.getElementById(`node-${endNode.row}-${endNode.col}`)
            .className = "dot endNodeAnimate"
    }, (visitedNodesInOrder.length) * 100)

    visitedNodesInOrder.push(closestNode)
    let traceAnimations = traceBack(graph, startNode, endNode, visitedNodesInOrder)

    return [startNodeAnimate, animatedNormalNodes, endNodeAnimate, traceAnimations]
}

function updateDist(graph, unVisitedNodes, closestNode) {
    for (let k = 0; k < unVisitedNodes.length; k++) {
        let node = unVisitedNodes[k]
        let nodeInGraph = graph[node.row][node.col]

        if (nodeInGraph.distance > closestNode.distance + 1) {
            nodeInGraph.distance = closestNode.distance + 1
            nodeInGraph.previous = closestNode
        }
    }
}

function findNodeWithMinDist(graph, width, height) {
    let currentMin = Infinity
    let currentMinNode = null
    for (let row = 0; row < width; row++) {
        for (let col = 0; col < height; col++) {
            if (graph[row][col].isVisited === false &&
                graph[row][col].distance < currentMin) {
                currentMin = graph[row][col].distance
                currentMinNode = graph[row][col]
            }
        }
    }
    return currentMinNode
}

function traceBack(graph, startNode, endNode, visitedNodesInOrder) {
    let shortestPath = []
    let startPathAnimate = 0
    let animatedPath = []
    let endPathAnimate = 0
    let currentNode = graph[endNode.row][endNode.col]

    while (currentNode.row !== startNode.row || currentNode.col !== startNode.col) {
        shortestPath.push(currentNode)
        currentNode = currentNode.previous
    }
    shortestPath.push(currentNode)
    shortestPath.reverse()

    // Sets starting and ending node to regular nodes and it can re-animate
    setTimeout(() => {
        document.getElementById(`node-${startNode.row}-${startNode.col}`)
            .className = "dot startNode"
        document.getElementById(`node-${endNode.row}-${endNode.col}`)
            .className = "dot endNode"
    }, (visitedNodesInOrder.length) * 101)

    for (let k = 0; k < shortestPath.length; k++) {
        let currentNode = shortestPath[k]
        const { row, col } = currentNode

        if (currentNode === startNode) {
            startPathAnimate = setTimeout(() => {
                document.getElementById(`node-${row}-${col}`)
                    .className = "dot startNodeAnimate"
            }, (visitedNodesInOrder.length + 1) * 101)
        }

        if (currentNode !== startNode && currentNode !== endNode) {
            animatedPath.push(
                setTimeout(() => {
                    document.getElementById(`node-${row}-${col}`)
                        .className = "dot shortestPathNode"
                }, (visitedNodesInOrder.length + (k + 1)) * 101)
            )
        }
    }
    endPathAnimate = setTimeout(() => {
        document.getElementById(`node-${endNode.row}-${endNode.col}`)
            .className = "dot endNodeAnimate"
    }, (visitedNodesInOrder.length + shortestPath.length + 1) * 101)

    return [startPathAnimate, animatedPath, endPathAnimate]
}
