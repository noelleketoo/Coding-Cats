#include <SFML/Graphics.hpp>
#include <iostream>

int main() {
    // Create a window (800x600 pixels)
    sf::RenderWindow window(sf::VideoMode({800, 600}), "Coding Cats");

    // --- LOAD THE CAT ---
    // Step 1: Load the image file into a texture
    sf::Texture catTexture;
    if (!catTexture.loadFromFile("pictures/Cat Sprite Sheet.png")) {
        std::cout << "Failed to load cat sprite sheet!" << std::endl;
        return 1;
    }

    // Step 2: Create a sprite that uses the texture
    sf::Sprite cat(catTexture);

    // Step 3: Pick just one frame from the sprite sheet (top-left cat)
    // The sheet is 256x320 — each frame is roughly 32x32 pixels
    cat.setTextureRect(sf::IntRect({0, 0}, {32, 32}));

    // Step 4: Scale it up so it's not tiny (4x bigger)
    cat.setScale({4.f, 4.f});

    // Step 5: Position it in the center-ish of the window
    cat.setPosition({350.f, 250.f});

    // Game loop
    while (window.isOpen()) {
        // --- HANDLE INPUT ---
        while (const auto event = window.pollEvent()) {
            if (event->is<sf::Event::Closed>()) {
                window.close();
            }
        }

        // --- DRAW ---
        window.clear(sf::Color(147, 112, 219));  // purple background
        window.draw(cat);                          // draw the cat on top
        window.display();                          // show everything
    }

    return 0;
}
