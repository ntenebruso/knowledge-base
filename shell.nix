{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  nativeBuildInputs = with pkgs.buildPackages; [
    hugo
    nodejs_20
    yarn
    pandoc
  ];
}
