import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ChemElement, getChemElement } from "simple-periodic-table-data";

gsap.registerPlugin(MotionPathPlugin);

export type AnimateAtomOptions = {
  containerSelector: string; // An id, class or any selector of the container that will contain svg
  elementPeriodicNumber: number; // 1-118. Number of the element from periodic table
  animationDuration?: {
    minimum: number; // Default 6
    maximum: number; // Default 15
  };
  animated?: boolean; // Default "true"
};

function calculateViewBox(element: ChemElement) {
  const numberOfOrbits = element.electronConfig.length;
  const electronRadius = 5;
  const spacingBetweenOrbits = 30;
  const padding = 20;
  const dimensionSize =
    numberOfOrbits * spacingBetweenOrbits * 2 +
    electronRadius * 2 +
    padding * 2;
  const horizontalCenter = dimensionSize / 2;
  const verticalCenter = dimensionSize / 2;

  return {
    width: dimensionSize,
    height: dimensionSize,
    horizontalCenter,
    verticalCenter,
    spacing: spacingBetweenOrbits,
  };
}

function getContainer(selector: string) {
  const node = document.querySelector(selector);
  if (!node) {
    throw new Error(
      `Container "${selector}" was not found. Please make sure such element exists in the DOM`,
    );
  }

  return node;
}

export function animateAtom(options: AnimateAtomOptions) {
  const element = getChemElement(options.elementPeriodicNumber);

  const container = getContainer(options.containerSelector);
  container.innerHTML = "";

  const svg = generateSVG(element);
  svg.innerHTML = "";

  container.append(svg);

  // Add Nucleus
  const nucleusNode = generateNucleus(element);
  svg.appendChild(nucleusNode);

  element.electronConfig.forEach((electronsCount, index) => {
    const electronTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0,
    });

    const orbitNumber = index + 1;

    // Add Orbit
    const orbitNode = generateOrbit(element, orbitNumber);
    svg.appendChild(orbitNode);

    // Add electrons
    const electronsCollection = new Array(electronsCount).fill(null);
    const electrons = electronsCollection.map(() => generateElectron());

    // Attach electrons to SVG
    electrons.forEach((electronNode) => {
      svg.appendChild(electronNode);
    });

    const isReversed = Math.random() > 0.4;

    // Animate electrons
    const minimumDuration = options.animationDuration?.minimum ?? 6;
    const maximumDuration = options.animationDuration?.maximum ?? 15;

    // Randomize values in range from min to max
    const animationDuration =
      Math.floor(Math.random() * (maximumDuration - minimumDuration + 1)) +
      minimumDuration;

    // Animate electrons on the orbit
    electronTimeline.to(electrons, {
      duration: animationDuration,
      ease: "none",
      transformOrigin: "-50% -50%",
      stagger: {
        each: animationDuration / electronsCount,
        repeat: -1,
      },
      motionPath: {
        path: `#orbit_${orbitNumber}`,
        start: isReversed ? 1 : 0,
        end: isReversed ? 0 : 1,
      },
    });

    electronTimeline.seek(animationDuration);

    if (options.animated === false) {
      electronTimeline.pause();
    }
  });
}

function generateSVG(element: ChemElement) {
  const svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgNode.classList.add("atom_svg");

  const { height, width } = calculateViewBox(element);
  svgNode.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svgNode.setAttribute("width", width.toString());

  return svgNode;
}

function generateElectron() {
  const electronNode = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );
  electronNode.setAttribute("class", "atom_electron");
  electronNode.setAttribute("r", "5");

  return electronNode;
}

function generateNucleus(element: ChemElement) {
  const nucleusNode = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );
  nucleusNode.setAttribute("class", "atom_nucleus");
  nucleusNode.setAttribute("r", "15");

  const { horizontalCenter, verticalCenter } = calculateViewBox(element);

  nucleusNode.setAttribute("cx", horizontalCenter.toString());
  nucleusNode.setAttribute("cy", verticalCenter.toString());

  return nucleusNode;
}

function generateOrbit(element: ChemElement, orbitNumber: number) {
  const orbitNode = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  orbitNode.setAttribute("class", "atom_orbit");
  orbitNode.setAttribute("id", `orbit_${orbitNumber}`);

  // Path commands
  const { horizontalCenter, verticalCenter, spacing } =
    calculateViewBox(element);

  const moveToStart = `M ${horizontalCenter - spacing * orbitNumber
    },${verticalCenter}`;

  const arcRadius = spacing * orbitNumber;
  const archFirstHalf = `A ${arcRadius},${arcRadius} 0 1 1 ${horizontalCenter + arcRadius
    },${verticalCenter}`;
  const archSecondHalf = `A ${arcRadius},${arcRadius} 0 1 1 ${horizontalCenter - arcRadius
    },${verticalCenter}`;

  orbitNode.setAttribute(
    "d",
    `${moveToStart} ${archFirstHalf} ${archSecondHalf}`,
  );

  return orbitNode;
}
