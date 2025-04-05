import json
import random
import sys # Import sys module to read stdin

def simulate_ai_processing(prompt: str, style_reference: str = None) -> str:
    """Simulates AI processing based on a prompt and optional style.

    Args:
        prompt: The user's text prompt describing the desired art.
        style_reference: An optional reference to a style (e.g., image URL, style name).

    Returns:
        A JSON string representing the simulated art parameters.
    """
    # Use stderr for logging to avoid interfering with JSON output on stdout
    print(f"[AI Simulator Log] Received prompt: '{prompt}', Style: '{style_reference}'", file=sys.stderr)

    # Simulate generating some parameters based on the prompt length or keywords
    complexity = len(prompt) % 5 + 1
    color_palette = random.choice(["Vibrant", "Pastel", "Monochrome", "Earthy", "Neon"])
    shapes = random.sample(["Circles", "Squares", "Triangles", "Organic", "Abstract Lines"], k=random.randint(1, 3))

    art_params = {
        "prompt_received": prompt,
        "style_reference": style_reference,
        "generated_parameters": {
            "complexity_score": complexity,
            "dominant_color_palette": color_palette,
            "key_shapes": shapes,
            "texture": random.choice(["Smooth", "Rough", "Glossy", "Matte"]),
            "seed": random.randint(1000, 9999) # Simulate a generation seed
        },
        "simulation_mode": True
    }

    # Log generated params to stderr
    print(f"[AI Simulator Log] Generated params: {json.dumps(art_params)}", file=sys.stderr)

    # Return the final JSON result string (this will be printed to stdout later)
    return json.dumps(art_params)

# Main execution block
if __name__ == "__main__":
    try:
        # Read the entire standard input
        input_json_str = sys.stdin.read()
        print(f"[AI Simulator Log] Received stdin data: {input_json_str}", file=sys.stderr)

        # Parse the input JSON string
        input_params = json.loads(input_json_str)

        # Extract prompt and optional style reference from the parsed parameters
        # Adapt this based on the actual structure sent by Node.js (currently expects {'prompt': '...', 'style': '...'})
        input_prompt = input_params.get('prompt', 'Default prompt if missing')
        input_style = input_params.get('style', None)

        # Call the simulation function with the extracted parameters
        result_json = simulate_ai_processing(input_prompt, input_style)

        # Print the final JSON result to standard output (for Node.js to capture)
        print(result_json)

    except json.JSONDecodeError as e:
        print(f"[AI Simulator Error] Failed to decode JSON from stdin: {e}", file=sys.stderr)
        # Exit with a non-zero code to indicate error to Node.js
        sys.exit(1)
    except Exception as e:
        print(f"[AI Simulator Error] An unexpected error occurred: {e}", file=sys.stderr)
        sys.exit(1) 