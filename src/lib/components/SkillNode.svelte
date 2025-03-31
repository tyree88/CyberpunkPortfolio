<script lang="ts">
  import type { Skill } from '$lib/types/skills';

  /**
   * SkillNode.svelte
   * Displays a single skill node in the visualization.
   */

  export let skill: Skill;
  export let style: string = ''; // For positioning calculated by the parent

  // Base cyberpunk colors
  const teal = '#49c5b6';
  const gold = '#ECD06F';
  const red = '#ff5252';

  // Determine color based on category or default
  // You can expand this logic
  $: nodeColor = skill.category === 'Animation' ? gold :
                 skill.category === 'Framework' ? red :
                 teal; // Default color

  $: nodeStyle = `
    ${style}
    --node-color: ${nodeColor};
    --node-shadow-color: ${nodeColor}80; /* Add some transparency */
  `;

</script>

<div class="skill-node" style={nodeStyle}>
  <!-- Optional: Add icon here later -->
  <span class="skill-name">{skill.name}</span>
  <!-- Optional: Add level indicator here later -->
</div>

<style>
  .skill-node {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 15px;
    background-color: rgba(10, 25, 40, 0.8); /* Dark blue-ish background */
    border: 1px solid var(--node-color);
    color: var(--node-color);
    font-family: 'Orbitron', sans-serif; /* Suggest using a cyberpunk font */
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: default;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 0 5px 0px var(--node-shadow-color), inset 0 0 3px 0px var(--node-shadow-color);
    min-width: 100px; /* Ensure nodes have some base width */
    text-align: center;
    white-space: nowrap;

    /* Basic geometric shape - can be customized */
    clip-path: polygon(10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px);
  }

  .skill-node:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px 2px var(--node-shadow-color), inset 0 0 8px 1px var(--node-shadow-color);
    z-index: 10; /* Bring to front on hover */
  }

  .skill-name {
    /* Add styles if needed */
  }

  /* Consider adding a cyberpunk font via @font-face in your global styles */
  /* @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap'); */

</style>