---
title: Arch Linux Installation Guide
date: 2024-07-26
draft: false
categories:
  - linux
---
## Pre-install

1. Download arch linux

Use the [Official download site](https://archlinux.org/download/)

2. Connect to the internet

```sh
iwctl station wlan0 get-networks
iwctl station wlan0 connect "SSID"
```

## Partition Disks

For non-encrypted disks, follow the [Non-encrypted](#non-encrypted) section. To encrypt your system, follow the [Encrypted](#Encrypted) section.

### Non-encrypted

#### Create partitions

`fdisk` into disk to partition, e.g:

```sh
fdisk /dev/sda0
```

> [!reminder]
> List disks using the command `fdisk -l` or `lsblk`

Recommended partition layout, according to the Arch Wiki:

| Mountpoint | Partition                   | Partition Type       | Suggested Size                               |
| ---------- | --------------------------- | -------------------- | -------------------------------------------- |
| `/boot`    | `/dev/efi_system_partition` | EFI system partition | 1 GiB                                        |
| `[SWAP]`   | `/dev/swap_partition`       | Linux swap           | At least 4 GiB                               |
| `/`        | `/dev/root_partition`       | Linux partition      | Remainder of the device. At least 23–32 GiB. |

#### Format partitions

```sh
mkfs.ext4 /dev/root_partition
```

```sh
mkswap /dev/swap_partition
```

```sh
mkfs.fat -F 32 /dev/efi_system_partition
```

### Mount partitions

```sh
mount /dev/root_partition /mnt
```

```sh
swapon /dev/swap_partition
```

```sh
mount --mkdir /dev/efi_system_partition /mnt/boot
```

### Encrypted (LVM on LUKS)

#### Create partitions

Recommended partition layout. You can use `fdisk` or `cfdisk` to create partitions.

| Mountpoint | Partition                   | Partition Type       | Suggested Size                               |
| ---------- | --------------------------- | -------------------- | -------------------------------------------- |
| `/boot`    | `/dev/efi_system_partition` | EFI system partition | 1 GiB                                        |
| `/`        | `/dev/crypt_partition`      | Linux partition      | Remainder of the device. At least 23–32 GiB. |

`/dev/crypt_partition` will house an LVM group containing both the root and swap volumes. The entire partition will be encrypted on top of LUKS.

#### Format partitions

Use the below command to format and set up a password for your encrypted partition. **DO NOT FORGET THIS PASSWORD!**

```sh
cryptsetup luksFormat /dev/crypt_partition
```

```sh
mkfs.fat -F 32 /dev/efi_system_partition
```

#### Mount partitions

```sh
cryptsetup open /dev/crypt_partition cryptlvm
```


